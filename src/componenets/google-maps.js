import React, { useRef } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { DrawingManager, Polygon } from "@react-google-maps/api";
import geoJsonData from "./geoJsonData.json";
import geoJsonData2 from "./geoJsonData_2.json";
import geoJsonData3 from "./geoJsonData_3.json";
import pubsub from "../pubsub";
import { v4 as uuidv4 } from "uuid";

// import geoJsonData4 from "./ne_10m_admin_1_states_provinces.json";

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
  let dataLayer3 = useRef();
  let dataLayer4 = useRef();
  let dataLayer5 = useRef();
  let dataLayer6 = useRef();
  let dataLayer7 = useRef();
  let dataLayer8 = useRef();
  let dataLayer9 = useRef();
  let dataLayer10 = useRef();
  let dataLayer11 = useRef();
  let dataLayer12 = useRef();
  let dataLayer13 = useRef();
  let dataLayer14 = useRef();
  let dataLayer16 = useRef();
  let dataLayer15 = useRef();
  let dataLayer17 = useRef();
  let dataLayer18 = useRef();
  let dataLayer19 = useRef();
  let dataLayer20 = useRef();
  let dataLayer21 = useRef();
  let dataLayer22 = useRef();
  let dataLayer23 = useRef();
  let dataLayer24 = useRef();

  const onLoad = React.useCallback(function callback(map) {
    setMap(map);
    dataLayer1.current = new window.google.maps.Data({ map: map });
    dataLayer2.current = new window.google.maps.Data({ map: map });
    dataLayer3.current = new window.google.maps.Data({ map: map });
    dataLayer4.current = new window.google.maps.Data({ map: map });
    dataLayer5.current = new window.google.maps.Data({ map: map });
    dataLayer6.current = new window.google.maps.Data({ map: map });
    dataLayer7.current = new window.google.maps.Data({ map: map });
    dataLayer8.current = new window.google.maps.Data({ map: map });
    dataLayer9.current = new window.google.maps.Data({ map: map });
    dataLayer10.current = new window.google.maps.Data({ map: map });
    dataLayer11.current = new window.google.maps.Data({ map: map });
    dataLayer12.current = new window.google.maps.Data({ map: map });
    dataLayer13.current = new window.google.maps.Data({ map: map });
    dataLayer14.current = new window.google.maps.Data({ map: map });
    dataLayer15.current = new window.google.maps.Data({ map: map });
    dataLayer16.current = new window.google.maps.Data({ map: map });
    dataLayer17.current = new window.google.maps.Data({ map: map });
    dataLayer18.current = new window.google.maps.Data({ map: map });
    dataLayer19.current = new window.google.maps.Data({ map: map });
    dataLayer20.current = new window.google.maps.Data({ map: map });
    dataLayer21.current = new window.google.maps.Data({ map: map });
    dataLayer22.current = new window.google.maps.Data({ map: map });
    dataLayer23.current = new window.google.maps.Data({ map: map });
    dataLayer24.current = new window.google.maps.Data({ map: map });
    dataLayer1.current.addGeoJson(geoJsonData);
    dataLayer2.current.addGeoJson(geoJsonData2);
    dataLayer3.current.addGeoJson(geoJsonData2);
    dataLayer4.current.addGeoJson(geoJsonData2);
    dataLayer5.current.addGeoJson(geoJsonData2);
    dataLayer6.current.addGeoJson(geoJsonData2);
    dataLayer7.current.addGeoJson(geoJsonData2);
    dataLayer8.current.addGeoJson(geoJsonData2);
    dataLayer9.current.addGeoJson(geoJsonData2);
    dataLayer10.current.addGeoJson(geoJsonData2);
    dataLayer11.current.addGeoJson(geoJsonData2);
    dataLayer12.current.addGeoJson(geoJsonData2);
    dataLayer13.current.addGeoJson(geoJsonData2);
    dataLayer14.current.addGeoJson(geoJsonData2);
    dataLayer15.current.addGeoJson(geoJsonData2);
    dataLayer16.current.addGeoJson(geoJsonData2);
    dataLayer17.current.addGeoJson(geoJsonData2);
    dataLayer18.current.addGeoJson(geoJsonData2);
    dataLayer19.current.addGeoJson(geoJsonData2);
    dataLayer20.current.addGeoJson(geoJsonData2);
    dataLayer21.current.addGeoJson(geoJsonData2);
    dataLayer22.current.addGeoJson(geoJsonData2);
    dataLayer23.current.addGeoJson(geoJsonData2);
    dataLayer24.current.addGeoJson(geoJsonData2);
    dataLayer1.current.setStyle({ draggable: false, editable: false });
    dataLayer2.current.setStyle({ draggable: false, editable: false });
    dataLayer3.current.setStyle({ draggable: false, editable: false });
    dataLayer4.current.setStyle({ draggable: false, editable: false });
    dataLayer5.current.setStyle({ draggable: false, editable: false });
    dataLayer6.current.setStyle({ draggable: false, editable: false });
    dataLayer7.current.setStyle({ draggable: false, editable: false });
    dataLayer8.current.setStyle({ draggable: false, editable: false });
    dataLayer9.current.setStyle({ draggable: false, editable: false });
    dataLayer10.current.setStyle({ draggable: false, editable: false });
    dataLayer11.current.setStyle({ draggable: false, editable: false });
    dataLayer12.current.setStyle({ draggable: false, editable: false });
    dataLayer13.current.setStyle({ draggable: false, editable: false });
    dataLayer14.current.setStyle({ draggable: false, editable: false });
    dataLayer15.current.setStyle({ draggable: false, editable: false });
    dataLayer16.current.setStyle({ draggable: false, editable: false });
    dataLayer17.current.setStyle({ draggable: false, editable: false });
    dataLayer18.current.setStyle({ draggable: false, editable: false });
    dataLayer19.current.setStyle({ draggable: false, editable: false });
    dataLayer20.current.setStyle({ draggable: false, editable: false });
    dataLayer21.current.setStyle({ draggable: false, editable: false });
    dataLayer22.current.setStyle({ draggable: false, editable: false });
    dataLayer23.current.setStyle({ draggable: false, editable: false });
    dataLayer24.current.setStyle({ draggable: false, editable: false });
    dataLayer1.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer2.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer3.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer4.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer5.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer6.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer7.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer8.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer9.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer10.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer11.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer12.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer13.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer14.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer15.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer16.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer17.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer18.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer19.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer20.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer21.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer22.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer23.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer24.current.addListener("click", toggleDataLayerEditFlag);
    // dataLayer1.current.addListener("click", toggleDataLayerEditFlag);
    // dataLayer2.current.addListener("click", toggleDataLayerEditFlag);
    dataLayer1.current.addListener("dblclick", removeDataClickHandler);
    dataLayer2.current.addListener("dblclick", removeDataClickHandler);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);

  const onLoadDrawingManager = (drawingManager) => {
    // console.log(drawingManager);
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
    pubsub.publish("polygonAdded", {
      eventType: "New polygon created",
      polygonId: uuidv4(),
    });
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
