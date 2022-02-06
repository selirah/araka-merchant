import React, { useState, useEffect, useRef, useCallback } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import { LoginForm } from '../components/login/LoginForm'
import { Login as Auth, Error } from '../interfaces'
import { loginRequest, clearAuthState } from '../store/auth'
import { path } from '../helpers/path'
import { Language } from '../components/menu/Language'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY } from '../helpers/constants'

interface LoginProps {}

const DELAY = 1500

const Login: React.FC<LoginProps> = () => {
  const dispatch: AppDispatch = useDispatch()
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<Auth>({
    EmailAddress: '',
    Password: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState<Error | {}>({})
  const [singleError, setSingleError] = useState<string>('')
  const history = useHistory()
  const [load, setLoad] = useState(false)
  const [expired, setExpired] = useState(false)
  const reCaptchaRef = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    dispatch(clearAuthState())
    setTimeout(() => {
      setLoad(true)
    }, DELAY)
    return () => {
      setIsMounted(!isMounted)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSubmit = (values: Auth) => {
    reCaptchaRef.current
      .executeAsync()
      .then((value: string) => {
        if (value && !expired) {
          const payload: Auth = {
            EmailAddress: values.EmailAddress,
            Password: values.Password
          }
          dispatch(loginRequest(payload))
        }
      })
      .catch((err: any) => {})
  }

  useEffect(() => {
    const { isSubmitting, error, singleError, isAuthenticated } = auth
    setIsSubmit(isSubmitting)
    setError(error)
    setSingleError(singleError)
    if (isAuthenticated) {
      history.push(path.home)
    }
  }, [auth, history])

  const handleRecaptcha = useCallback((value) => {
    if (value === null) setExpired(true)
  }, [])

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
        />
      </Content>
      {load && (
        <ReCAPTCHA
          theme="light"
          size="invisible"
          ref={reCaptchaRef}
          sitekey={`${SITE_KEY}`}
          onChange={handleRecaptcha}
        />
      )}
    </Layout>
  )
}

export default withRouter(Login)
