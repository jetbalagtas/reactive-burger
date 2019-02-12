import React, { useEffect, Suspense } from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const app = props => {
  useEffect(() => {
    props.onTryAutoSignin();
  }, []);

  let routes = (
    <Switch>
      <Route path='/sign-in' render={props => <Auth {...props} />} />
      <Route path='/' exact component={BurgerBuilder} />
      <Redirect to='/' /> {/* redirect unknown routes to home */}
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/checkout' render={props => <Checkout {...props} />} />
        <Route path='/orders' render={props => <Orders {...props} />} />
        <Route path='/logout' component={Logout} />
        <Route path='/sign-in' render={props => <Auth {...props} />} />
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
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );  
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(app));
