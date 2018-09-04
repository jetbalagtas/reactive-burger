import React, { Component } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignin();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/sign-in' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/' /> {/* redirect unknown routes to home */}
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/sign-in' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/' /> {/* redirect unknown routes to home */}
          {/* exact not required with Switch */}
          {/* only direct components loaded by the router get special props */}
          {/* to access special props from a child component (ie. Burger), wrap the child export with 'withRouter' hoc. see Burger.js */}
        </Switch>
      );
    }

    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignin: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
