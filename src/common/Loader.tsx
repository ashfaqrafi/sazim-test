import { Component } from "react";
import { BeatLoader } from "react-spinners";

class Loader extends Component<any> {
  render() {
    if (this.props.fullscreen) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <BeatLoader
            size={15}
            margin={"10px"}
            color={this.props.color || "black"}
            loading={true}
          />
        </div>
      );
    }
    if (this.props.small)
      return (
        <BeatLoader
          size={10}
          margin={"5px"}
          color={this.props.color || "black"}
          loading={true}
        />
      );
    if (this.props.large) {
      return (
        <BeatLoader
          size={30}
          margin={"10px"}
          color={this.props.color || "black"}
          loading={true}
        />
      );
    }
    return (
      <BeatLoader
        size={15}
        margin={"10px"}
        color={this.props.color || "black"}
        loading={true}
      />
    );
  }
}

export default Loader;
