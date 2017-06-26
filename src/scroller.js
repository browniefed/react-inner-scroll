import React, { Component } from 'react';
import { findDOMNode } from "react-dom";
import scrollIntoView from "scroll-into-view";
import PropTypes from "prop-types";

class ScrollView extends Component {
  static childContextTypes = {
    scroll: PropTypes.object,
  }
  elements = {};
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
        unregister: this.unregister
      }
    }
  }
  scrollTo = (name) => {
    const node = findDOMNode(this.elements[name]);
    scrollIntoView(node, {
      time: 500,
      align: {
        top: 0
      }
    })
  }
  render() {
    return (
      React.Children.only(this.props.children)
    );
  }
}

class ScrollElement extends Component {
  static contextTypes = {
    scroll: PropTypes.object,
  }
  componentDidMount() {
    this.context.scroll.register(this.props.name, this._element);
  }
  componentWillUnmount() {
    this.context.scroll.unregister(this.props.name);
  }
  
  render() {
    return (
      React.cloneElement(this.props.children, {
        ref: ref => this._element = ref
      })
    );
  }
}

export {
  ScrollElement
}

export default ScrollView;