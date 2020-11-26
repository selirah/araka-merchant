import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { LoginForm } from '../components/login/LoginForm';
import { Login as Auth, Error } from '../interfaces';
import { loginRequest, clearAuthState } from '../store/auth';
import { path } from '../helpers/path';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { Content } = Layout;
  const [values] = useState<Auth>({
    EmailAddress: '',
    Password: '',
    RememberMe: false,
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  const history = useHistory();

  useEffect(() => {
    dispatch(clearAuthState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: Auth) => {
    const payload: Auth = {
      EmailAddress: values.EmailAddress,
      Password: values.Password,
    };
    dispatch(loginRequest(payload));
  };

  useEffect(() => {
    const { isSubmitting, error, singleError, isAuthenticated } = auth;
    setIsSubmit(isSubmitting);
    setError(error);
    setSingleError(singleError);
    if (isAuthenticated) {
      history.push(path.home);
    }
  }, [auth, history]);

  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <LoginForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
          singleError={singleError}
        />
      </Content>
    </Layout>
  );
};

export default withRouter(Login);
