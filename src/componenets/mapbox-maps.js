/// app.js
import React, { useCallback, useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { KMLLoader } from "@loaders.gl/kml";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import { PolygonLayer, GeoJsonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";
import { FlyToInterpolator } from "deck.gl";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  ViewMode,
  ModifyMode,
} from "nebula.gl";

const KML_FILE_PATH = "./data/polygon_testing.kml";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg";

const MODES = [
  { id: "view", text: "Viewing polygons", handler: ViewMode },
  { id: "drawPolygon", text: "Draw Polygon", handler: DrawPolygonMode },
  { id: "editing", text: "Edit Feature", handler: ModifyMode },
];

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

const selectedFeatureIndexes = [];

const MapboxMaps = ({ coordinates }) => {
  const [mapCoords, setMapCoords] = useState({
    type: "FeatureCollection",
    features: [],
  });

  const [layers, setLayers] = useState([
    new PolygonLayer({
      id: "PolygonLayer",
      data: "https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json",
      extruded: true,
      filled: true,
      getElevation: (d) => d.population / d.area / 10,
      getFillColor: (d) => [d.population / d.area / 60, 140, 0],
      getLineColor: [80, 80, 80],
      getLineWidth: (d) => 1,
      getPolygon: (d) => d.contour,
      lineWidthMinPixels: 1,
      stroked: true,
      wireframe: true,
      pickable: true,
    }),
  ]);

  const [viewState, setViewState] = useState({
    latitude: 37.7751,
    longitude: -122.4193,
    zoom: 11,
    bearing: 0,
    pitch: 0,
  });

  const [editorMode, setEditorMode] = useState({
    id: null,
    handler: null,
  });

  useEffect(() => {
    const parseData = async () => {
      const newLayerData = await load(KML_FILE_PATH, KMLLoader);
      setMapCoords(newLayerData);
      const coordinates = newLayerData.features.flatMap(
        (feat) => feat.geometry.coordinates
      );
      const flatttenedCoordinates = coordinates.flat(1);
      const { latitude, longitude } = averageGeolocation(flatttenedCoordinates);

      console.log(editorMode);

      if (mapCoords) {
        console.log(mapCoords);
        const newLayer = new EditableGeoJsonLayer({
          id: "geojson-layer",
          data: mapCoords,
          mode: DrawPolygonMode,
          selectedFeatureIndexes,
          onEdit: ({ updatedData, editType }) => {
            setMapCoords(updatedData);
          },
        });
        setLayers((prevLayers) => [...prevLayers, newLayer]);

        setViewState({
          longitude,
          latitude,
          zoom: 16,
          pitch: 0,
          bearing: 0,
          transitionDuration: 1000,
          transitionInterpolator: new FlyToInterpolator(),
        });
      }
    };
    parseData();
  }, []);

  return (
    <DeckGL initialViewState={viewState} controller={true} layers={layers}>
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default MapboxMaps;
