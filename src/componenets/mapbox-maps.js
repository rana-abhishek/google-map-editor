/// app.js
import React, { useCallback, useEffect, useState } from "react";
import DeckGL from "@deck.gl/react";
import { KMLLoader } from "@loaders.gl/kml";
import { CSVLoader } from "@loaders.gl/csv";
import { load } from "@loaders.gl/core";
import { PolygonLayer, GeoJsonLayer } from "@deck.gl/layers";
import {
  StaticMap,
  _MapContext as MapContext,
  NavigationControl,
} from "react-map-gl";
import { FlyToInterpolator } from "deck.gl";
import { EditableGeoJsonLayer } from "@nebula.gl/layers";

const KML_FILE_PATH = "./data/polygon_testing.kml";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg";

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

const MapboxMaps = ({ coordinates }) => {
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

  useEffect(() => {
    const parseData = async () => {
      const newLayerData = await load(KML_FILE_PATH, KMLLoader);
      const coordinates = newLayerData.features.flatMap(
        (feat) => feat.geometry.coordinates
      );
      const flatttenedCoordinates = coordinates.flat(1);
      const { latitude, longitude } = averageGeolocation(flatttenedCoordinates);

      const newLayer = new GeoJsonLayer({
        id: "geojson-layer",
        data: newLayerData,
        filled: true,
        pickable: true,
        getPosition: (d) => d.geometry.coordinates,
      });

      setLayers((prevLayers) => [...prevLayers, newLayer]);

      setViewState({
        longitude,
        latitude,
        zoom: 16,
        pitch: 0,
        bearing: 0,
        transitionDuration: 4000,
        transitionInterpolator: new FlyToInterpolator(),
      });
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
