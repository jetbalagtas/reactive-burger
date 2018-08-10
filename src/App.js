import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/orders' component={Orders} />
            <Route path='/' exact component={BurgerBuilder} />
            {/* exact not required with Switch */}
            {/* only direct components loaded by the router get special props */}
            {/* to access special props from a child component (ie. Burger), wrap the child export with 'withRouter' hoc. see Burger.js */}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
