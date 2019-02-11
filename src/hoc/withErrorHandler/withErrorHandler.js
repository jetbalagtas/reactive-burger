import React, { useState, useEffect } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return props => {
    const [error, setError] = useState(null);

    // Warning: these interceptors will be attached multiple times when reusing this HOC to wrap multiple components.
    // These will cause memory leaks when one of the wrapped components stops being used or is no longer required.
    // Protect against leaks or undesired behavior by storing references to the interceptors, then...
    // Clean them up with the useEffect hook below.
    const reqInterceptor = axios.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInterceptor = axios.interceptors.response.use(res => res, err => {
      setError(err);
    });

    // To prevent memory leaks when reusing this HOC in wrapping multiple components, clean up the interceptors above with:
    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqInterceptor);
        axios.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    return (
      <Aux>
        <Modal show={error}
          closeModal={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  }
}

export default withErrorHandler;
