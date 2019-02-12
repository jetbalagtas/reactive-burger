import { useState, useEffect } from 'react';

export default httpClient => {
  const [error, setError] = useState(null);

    // Warning: these interceptors will be attached multiple times when reusing this HOC to wrap multiple components.
    // These will cause memory leaks when one of the wrapped components stops being used or is no longer required.
    // Protect against leaks or undesired behavior by storing references to the interceptors, then...
    // Clean them up with the useEffect hook below.
    const reqInterceptor = httpClient.interceptors.request.use(req => {
      setError(null);
      return req;
    });
    const resInterceptor = httpClient.interceptors.response.use(res => res, err => {
      setError(err);
    });

    // To prevent memory leaks when reusing this HOC in wrapping multiple components, clean up the interceptors above with:
    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqInterceptor);
        httpClient.interceptors.response.eject(resInterceptor);
      }
    }, [reqInterceptor, resInterceptor]);

    const errorConfirmedHandler = () => {
      setError(null);
    }

    return [error, errorConfirmedHandler];
}
