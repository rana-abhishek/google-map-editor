/// app.js
import React from "react";
import DeckGL from "@deck.gl/react";
import { MapView, FirstPersonView } from "@deck.gl/core";

import { PolygonLayer } from "@deck.gl/layers";
import { StaticMap } from "react-map-gl";

// Viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.4,
  latitude: 37.74,
  zoom: 11,
  maxZoom: 20,
  pitch: 30,
  bearing: 0,
};

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
  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      getTooltip={({ object }) =>
        object && `${object.zipcode}\nPopulation: ${object.population}`
      }
    >
      <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default MapboxMaps;
