import { Component } from "react";

class Toggler extends Component {
  state = { show: false };
  toggle = () => {
    this.setState(cState => {
      return { show: !cState.show };
    });
  };
  render() {
    const { show } = this.state;
    const { children } = this.props;
    return children({ show, toggle: this.toggle });
  }
}

export default Toggler;
