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
    bearing: 0
};

// Data to be used by the LineLayer
const data = [
  {
    // Simple polygon (array of coords)
    contour: [
      [-122.4, 37.7],
      [-122.4, 37.8],
      [-122.5, 37.8],
      [-122.5, 37.7],
      [-122.4, 37.7],
    ],
    zipcode: 94107,
    population: 26599,
    area: 6.11,
  },
  {
    // Complex polygon with holes (array of rings)
    contour: [
      [
        [-122.4, 37.7],
        [-122.4, 37.8],
        [-122.5, 37.8],
        [-122.5, 37.7],
        [-122.4, 37.7],
      ],
      [
        [-122.45, 37.73],
        [-122.47, 37.76],
        [-122.47, 37.71],
        [-122.45, 37.73],
      ],
    ],
    zipcode: 94107,
    population: 26599,
    area: 6.11,
  },
];

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg";

const layers = [
    new PolygonLayer({
        id: 'PolygonLayer',
        data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/sf-zipcodes.json',
        
        /* props from PolygonLayer class */
        
        // elevationScale: 1,
        extruded: true,
        filled: true,
        getElevation: d => d.population / d.area / 10,
        getFillColor: d => [d.population / d.area / 60, 140, 0],
        getLineColor: [80, 80, 80],
        getLineWidth: d => 1,
        getPolygon: d => d.contour,
        // lineJointRounded: false,
        // lineMiterLimit: 4,
        // lineWidthMaxPixels: Number.MAX_SAFE_INTEGER,
        lineWidthMinPixels: 1,
        // lineWidthScale: 1,
        // lineWidthUnits: 'meters',
        // material: true,
        stroked: true,
        wireframe: true,
        
        /* props inherited from Layer class */
        
        // autoHighlight: false,
        // coordinateOrigin: [0, 0, 0],
        // coordinateSystem: COORDINATE_SYSTEM.LNGLAT,
        // highlightColor: [0, 0, 128, 128],
        // modelMatrix: null,
        // opacity: 1,
        pickable: true,
        // visible: true,
        // wrapLongitude: false,
      })
];

const MapboxMaps = ({ coordinates }) => {
  return (
    coordinates.length && (
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getTooltip={({object}) => object && `${object.zipcode}\nPopulation: ${object.population}`}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    )
  );
};

export default MapboxMaps;
