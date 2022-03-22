import DeckGL from "deck.gl";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  ViewMode,
  ModifyMode,
} from "nebula.gl";
import React from "react";
import { StaticMap } from "react-map-gl";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1IjoiYWJoaXNoZWstcmFuYSIsImEiOiJjbDB0cjl5d3gwb2ZiM2puNXhwMTA0Mm96In0.OP53G4BnNBQse6OJc0oNBg";

const selectedFeatureIndexes = [];

class EditableMaps extends React.Component {
  state = {
    data: this.props.coordinates,
    viewState: {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
      zoom: 16,
      bearing: 0,
      pitch: 0,
    },
  };

  render() {
    const layer = new EditableGeoJsonLayer({
      id: "geojson-layer",
      data: this.state.data,
      mode: "",
      selectedFeatureIndexes,

      onEdit: ({ updatedData }) => {
        this.setState({
          data: updatedData,
        });
      },
    });

    return (
      <DeckGL
        initialViewState={this.state.viewState}
        {...this.props.viewport}
        layers={[layer]}
      >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    );
  }
}

export default EditableMaps;
