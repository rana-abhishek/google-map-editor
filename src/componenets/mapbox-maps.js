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

const KML_FILE_PATH = "./data/polygon_testing.kml";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg";

const layers = [
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
];

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

  //   const onClickGeoJson = useCallback((event) => {
  //     const feature = event.features[0];
  //     const [minLng, minLat, maxLng, maxLat] = bbox(feature); // Turf.js
  //     const viewportWebMercator = new WebMercatorViewport(viewport);
  //     const { longitude, latitude, zoom } = viewport.fitBounds(
  //       [
  //         [minLng, minLat],
  //         [maxLng, maxLat],
  //       ],
  //       {
  //         padding: 20,
  //       }
  //     );
  //     viewportWebMercator = {
  //       ...viewport,
  //       longitude,
  //       latitude,
  //       zoom,
  //       transitionInterpolator: new LinearInterpolator({
  //         around: [event.offsetCenter.x, event.offsetCenter.y],
  //       }),
  //       transitionDuration: 1500,
  //     };
  //     setViewport(viewportWebMercator);
  //   }, []);

  useEffect(() => {
    const parseData = async () => {
      const newLayerData = await load(KML_FILE_PATH, KMLLoader);
      console.log(newLayerData);

      const newLayer = new GeoJsonLayer({
        id: "geojson-layer",
        data: newLayerData,
        filled: true,
        pickable: true,
        getPosition: (d) => d.geometry.coordinates,
      });

      setLayers((prevLayers) => [...prevLayers, newLayer]);

      setViewState({
        longitude: 77.09341,
        latitude: 28.59194,
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
    <DeckGL
      initialViewState={viewState}
      controller={true}
      layers={layers}
      //   getTooltip={({ object }) =>
      //     object && `${object.zipcode}\nPopulation: ${object.population}`
      //   }
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default MapboxMaps;
