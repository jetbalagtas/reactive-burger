import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../../store/actions/index';

class Logout extends Component {
  componentDidMount () {
    // this.props.onLogout(this.props.history); // can redirect this way, forward the props w/c will be loaded via the Router (push method)
    // or redirect declaratively with react-router-dom's <Redirect /> component
    this.props.onLogout();
  }

  render () {
    return <Redirect to='/' />;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actions.logout())
  };
}

export default connect(null, mapDispatchToProps)(Logout);
