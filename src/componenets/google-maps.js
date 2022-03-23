import React from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { DrawingManager, Polygon } from "@react-google-maps/api";
import geoJsonData from "./geoJsonData.json";

const containerStyle = {
  width: "100%",
  height: "100%",
};

const center = {
  lat: 28.632897467894534,
  lng: 77.21970319747925,
};

const libraries = ["drawing"];

const google = window.google;

function GoogleMapsComponent() {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCgdU5UGTSfLApTSi8oJK8BlMsLdKUYXNI",
    libraries: libraries,
  });

  const [map, setMap] = React.useState(null);
  const [polygons, setPolygons] = React.useState([]);

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    map.data.addGeoJson(geoJsonData);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoadDrawingManager = (drawingManager) => {
    console.log(drawingManager);
  };

  function editPolygonClickHandler(polygon) {
    const newEditState = !this.editable;
    this.setEditable(newEditState);
    this.setDraggable(newEditState);
  }

  function removePolygonClickHandler(polygon) {
    this.setMap(null);
  }

  const onPolygonComplete = (polygon) => {
    polygon.setEditable(false);
    polygon.addListener("click", editPolygonClickHandler);
    polygon.addListener("dblclick", removePolygonClickHandler);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDoubleClickZoom: true,
      }}
    >
      <></>
      <DrawingManager
        drawingMode={window.google.maps.drawing.OverlayType.POLYGON}
        onLoad={onLoadDrawingManager}
        onPolygonComplete={onPolygonComplete}
        options={{
          drawingControl: true,
          drawingControlOptions: {
            position: window.google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [window.google.maps.drawing.OverlayType.POLYGON],
          },
          polygonOptions: {
            fillColor: "#000",
            fillOpacity: 0.5,
            strokeWeight: 2,
            editable: false,
            draggable: false,
            zIndex: 1,
          },
          markerOptions: {
            icon: "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png",
          },
        }}
      />
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMapsComponent);
