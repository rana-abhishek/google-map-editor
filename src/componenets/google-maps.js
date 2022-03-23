import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { DrawingManager, Polygon } from "@react-google-maps/api";
import geoJsonData from "./geoJsonData.json";
import geoJsonData2 from "./geoJsonData_2.json";

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

  let dataLayer1 = useRef();
  let dataLayer2 = useRef();

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    dataLayer1.current = new window.google.maps.Data({ map: map });
    dataLayer2.current = new window.google.maps.Data({ map: map });
    dataLayer1.current.addGeoJson(geoJsonData);
    dataLayer2.current.addGeoJson(geoJsonData2);
    dataLayer1.current.setStyle({ draggable: false, editable: false });
    dataLayer2.current.setStyle({ draggable: false, editable: false });
    dataLayer1.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer2.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer1.current.addListener("dblclick", removeDataClickHandler);
    dataLayer2.current.addListener("dblclick", removeDataClickHandler);
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

  function removeDataClickHandler() {
    this.setMap(null);
  }

  function toggleDataLayerEditFlag(event) {
    const { editable, draggable } = this.getStyle();
    this.setStyle({ draggable: !draggable, editable: !editable });
  }

  const onPolygonComplete = (polygon) => {
    polygon.setEditable(false);
    polygon.addListener("click", editPolygonClickHandler);
    polygon.addListener("dblclick", removeDataClickHandler);
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
        drawingMode={""}
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
