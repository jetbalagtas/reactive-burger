import React, { Component } from 'react';

import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  }

  orderHandler = (event) => {
    event.preventDefault();
    this.setState({loading: true});
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price, // not for a real app. calculate the price on the server instead.
      customer: {
        name: 'Jet Balagtas',
        address: {
          street: '123 Main Street',
          city: 'Los Angeles',
          state: 'CA',
          phone: '(310) 555-1212'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    }
    axios.post('/orders.json', order)
      .then(response => {
        this.setState({loading: false});
        this.props.history.push('/');
      })
      .catch(error => {
        this.setState({loading: false});
      });
  }

  render () {
    let form = (
      <form>
        <input className={classes.Input} type="text" name='name' placeholder='Your Name' />
        <input className={classes.Input} type="email" name='email' placeholder='Your Email' />
        <input className={classes.Input} type="text" name='street' placeholder='Street Address' />
        <input className={classes.Input} type="text" name='postal' placeholder='Postal Code' />
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}
// we can wrap the ContactData export with the 'withRouter' method or pass props.history from this child component via the render method (see Checkout file)
export default ContactData;
