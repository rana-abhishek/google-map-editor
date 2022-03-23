import logo from "./logo.svg";
import "./App.css";
import MapboxMaps from "./componenets/mapbox-maps";
import { useEffect, useState } from "react";
import { debounce } from "lodash";
import { load } from "@loaders.gl/core";
import { KMLLoader } from "@loaders.gl/kml";
import { DrawPolygonMode, ViewMode, ModifyMode } from "nebula.gl";
import EditableMaps from "./componenets/editable-maps";
import EditMaps from "./componenets/edit-maps";
import GoogleMapsComponent from "./componenets/google-maps";

const KML_FILE_PATH = "./data/polygons_final.kml";

const averageGeolocation = (coords) => {
  if (coords.length === 1) {
    return coords[0];
  }

  let x = 0.0;
  let y = 0.0;
  let z = 0.0;

  for (let coord of coords) {
    let latitude = (coord[1] * Math.PI) / 180;
    let longitude = (coord[0] * Math.PI) / 180;

    x += Math.cos(latitude) * Math.cos(longitude);
    y += Math.cos(latitude) * Math.sin(longitude);
    z += Math.sin(latitude);
  }

  let total = coords.length;

  x = x / total;
  y = y / total;
  z = z / total;

  let centralLongitude = Math.atan2(y, x);
  let centralSquareRoot = Math.sqrt(x * x + y * y);
  let centralLatitude = Math.atan2(z, centralSquareRoot);

  return {
    latitude: (centralLatitude * 180) / Math.PI,
    longitude: (centralLongitude * 180) / Math.PI,
  };
};

const MODES = [
  { id: "view", text: "Viewing polygons", handler: ViewMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: ModifyMode },
];

function App() {
  const [mapCoords, setMapCoords] = useState({
    type: "FeatureCollection",
    features: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState({
    latitude: 0,
    longitude: 0,
  });

  const [editorMode, setEditorMode] = useState({
    id: null,
    handler: null,
  });

  const switchMode = (evt) => {
    const modeId =
      evt.target.value === editorMode.modeId ? null : evt.target.value;
    const mode = MODES.find((m) => m.id === modeId);
    const modeHandler = mode ? new mode.handler() : null;
    setEditorMode({ modeId, modeHandler });
    console.log(editorMode);
  };

  const renderToolbar = () => {
    return (
      <div
        style={{
          position: "absolute",
          zIndex: 1,
          top: 0,
          right: 0,
          maxWidth: "320px",
        }}
      >
        <select onChange={switchMode}>
          <option value="">--Please choose a draw mode--</option>
          {MODES.map((mode) => (
            <option key={mode.id} value={mode.id}>
              {mode.text}
            </option>
          ))}
        </select>
      </div>
    );
  };

  useEffect(() => {
    setIsLoading(true);
    const dataLoad = async () => {
      const newLayerData = await load(KML_FILE_PATH, KMLLoader);
      setMapCoords(newLayerData);
      const coordinates = newLayerData.features.flatMap(
        (feat) => feat.geometry.coordinates
      );
      const flatttenedCoordinates = coordinates.flat(1);
      const { latitude, longitude } = averageGeolocation(flatttenedCoordinates);
      setCenter((prevState) => ({ ...prevState, latitude, longitude }));

      setIsLoading(false);
    };
    dataLoad();
  }, []);

  return (
    <div className="App" style={{ height: "100%" }}>
      {/* {!isLoading && center.latitude && center.longitude && (
        <EditableMaps
          latitude={center.latitude}
          longitude={center.longitude}
          coordinates={mapCoords}
        />
      )} */}
      <GoogleMapsComponent />
    </div>
  );
}

export default App;
