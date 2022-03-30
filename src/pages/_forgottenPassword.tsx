import React, { useState, useEffect, useRef, useCallback } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import ForgottenPasswordForm from '../components/forgotten-password/ForgottenPasswordForm'
import { ForgottenPassword as FP } from '../interfaces'
import { forgottenPasswordRequest, clearAuthState } from '../store/auth'
import { Language } from '../components/menu/Language'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY } from '../helpers/constants'

const DELAY = 1500

const ForgottenPassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<FP>({
    EmailAddress: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState('')
  const history = useHistory()
  const [load, setLoad] = useState(false)
  const [expired, setExpired] = useState(false)
  const reCaptchaRef = useRef<any>()
  const [isMounted, setIsMounted] = useState(false)
  const [isSccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)

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

  const onSubmit = (values: FP) => {
    reCaptchaRef.current
      .executeAsync()
      .then((value: string) => {
        if (value && !expired) {
          const getUrl = window.location
          const baseUrl =
            getUrl.protocol +
            '//' +
            getUrl.host +
            '/' +
            getUrl.pathname.split('/')[1] +
            '/reset-password'
          const payload: FP = {
            EmailAddress: values.EmailAddress,
            CallbackURL: baseUrl
          }
          dispatch(forgottenPasswordRequest(payload))
        }
      })
      .catch((err: any) => {})
  }

  useEffect(() => {
    const {
      isForgottenPassword,
      forgottenPasswordSuccess,
      forgottenPasswordError,
      forgottenError
    } = auth
    setIsSubmit(isForgottenPassword)
    setError(forgottenError)
    setIsSuccess(forgottenPasswordSuccess)
    setIsError(forgottenPasswordError)
  }, [auth, history])

  const handleRecaptcha = useCallback((value) => {
    if (value === null) setExpired(true)
  }, [])

  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <Language />
        <ForgottenPasswordForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
          failure={isError}
          success={isSccess}
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

export default withRouter(ForgottenPassword)
