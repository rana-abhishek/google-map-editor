import React, { useEffect, useState } from "react";
import ReactMapboxGl, { Layer, Feature, Source } from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg",
});

const layerPaint = {
  "heatmap-weight": {
    property: "priceIndicator",
    type: "exponential",
    stops: [
      [0, 0],
      [5, 2],
    ],
  },
  // Increase the heatmap color weight weight by zoom level
  // heatmap-ntensity is a multiplier on top of heatmap-weight
  "heatmap-intensity": {
    stops: [
      [0, 0],
      [5, 1.2],
    ],
  },
  // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
  // Begin color ramp at 0-stop with a 0-transparancy color
  // to create a blur-like effect.
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.25,
    "rgb(103,169,207)",
    0.5,
    "rgb(209,229,240)",
    0.8,
    "rgb(253,219,199)",
    1,
    "rgb(239,138,98)",
    2,
    "rgb(178,24,43)",
  ],
  // Adjust the heatmap radius by zoom level
  "heatmap-radius": {
    stops: [
      [0, 1],
      [5, 50],
    ],
  },
};

const MapboxMaps = (props) => {
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {
    console.log("Render for first time");
    const dataLoad = async () => {
      const data = await fetch(
        "https://traffic.nayan.co/api/maps-details/allAppVio"
      );
      const result = await data.json();
      setCoordinates(result);
    };
    dataLoad();
  }, []);

  return (
    coordinates.length && (
      <Map
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        zoom={[1]}
        onRender={() => {
          console.log("Map rendered");
        }}
      >
        <Layer type="heatmap" paint={layerPaint}>
          {coordinates.map((coord) => (
            <Feature
              key={coord.vioId}
              coordinates={[+coord.vioLat, +coord.vioLon]}
            />
          ))}
        </Layer>
      </Map>
    )
  );
};

export default MapboxMaps;
