import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }

    // Warning: these interceptors will be attached multiple times when reusing this HOC to wrap multiple components.
    // These will cause memory leaks when one of the wrapped components stops being used or is no longer required.
    // Protect against leaks or undesired behavior by storing references to the interceptors, then...
    // Eject them with the componentWillUnmount lifecycle method.
    componentWillMount () {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }

    // To prevent memory leaks when reusing this HOC in wrapping multiple components, eject the interceptors above with:
    componentWillUnmount () {
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmedHandler = () => {
      this.setState({error: null});
    }

    render () {
      return (
        <Aux>
          <Modal show={this.state.error}
            closeModal={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;
