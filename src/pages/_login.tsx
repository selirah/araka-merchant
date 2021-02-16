import React, { useState, useEffect } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import { Layout, message } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { LoginForm } from '../components/login/LoginForm';
import { Login as Auth, Error } from '../interfaces';
import { loginRequest, clearAuthState } from '../store/auth';
import { path } from '../helpers/path';
import { Language } from '../components/menu/Language';
import { isEmpty } from '../helpers/isEmpty';
import { useTranslation } from 'react-i18next';

interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const auth = appSelector((state) => state.auth);
  const { Content } = Layout;
  const [values] = useState<Auth>({
    EmailAddress: '',
    Password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [error, setError] = useState<Error | {}>({});
  const [singleError, setSingleError] = useState<string>('');
  const history = useHistory();
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const { t } = useTranslation();

  useEffect(() => {
    setRecaptchaValue('');
    dispatch(clearAuthState());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (values: Auth) => {
    if (isEmpty(recaptchaValue)) {
      message.error(`${t('login.recaptcha')}`);
    } else {
      const payload: Auth = {
        EmailAddress: values.EmailAddress,
        Password: values.Password,
      };
      dispatch(loginRequest(payload));
    }
  };

  const onHandleRecaptcha = (value: any) => {
    setRecaptchaValue(value);
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
        <Language />
        <LoginForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
          singleError={singleError}
          onHandleRecaptcha={onHandleRecaptcha}
        />
      </Content>
    </Layout>
  );
};

export default withRouter(Login);
