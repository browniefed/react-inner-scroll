import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import PropTypes from "prop-types";
import scrollIntoView from "scroll-into-view";

class ScrollView extends Component {
  
  constructor(props) {
    super(props);
    this.elements = {}
  }

  register = (name, ref) => {
    this.elements[name] = ref;
  }
  unregister = (name) => {
    delete this.elements[name];
  }

  getChildContext() {
    return {
      scroll: {
        register: this.register,
        unregister: this.unregister,
      }
    }
  }

  scrollTo(name) {
    const node = findDOMNode(this.elements[name]);
    scrollIntoView(node, {
      time: 500,
    })
  }

  render() {
    return (
      React.Children.only(this.props.children)
    );
  }
}

ScrollView.childContextTypes = {
  scroll: PropTypes.object
};

class ScrollElement extends Component {
  componentDidMount() {
    this.context.scroll.register(this.props.name, this._ref);
  }

  componentWillUnmount() {
    this.context.scroll.unregister(this.props.name);
  }

  render() {
    return React.cloneElement(this.props.children, {
      ref: (ref) => this._ref = ref,
    })
  }
}

ScrollElement.contextTypes = {
  scroll: PropTypes.object,
}

export { 
  ScrollElement
}
export default ScrollView;