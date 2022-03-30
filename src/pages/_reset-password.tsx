import React, { useState, useEffect, useRef, useCallback } from 'react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import { Layout } from 'antd'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../helpers/appDispatch'
import { appSelector } from '../helpers/appSelector'
import ResetPasswordForm from '../components/forgotten-password/ResetPasswordForm'
import { ResetPassword as FP } from '../interfaces'
import { resetPasswordRequest, clearAuthState } from '../store/auth'
import { path } from '../helpers/path'
import { Language } from '../components/menu/Language'
import ReCAPTCHA from 'react-google-recaptcha'
import { SITE_KEY } from '../helpers/constants'

const DELAY = 1500

const ResetPassword = () => {
  const dispatch: AppDispatch = useDispatch()
  const query = new URLSearchParams(useLocation().search)
  const processId = query.get('PID')
  const auth = appSelector((state) => state.auth)
  const { Content } = Layout
  const [values] = useState<FP>({
    Password: '',
    ProcessId: processId ?? '',
    Confirm: ''
  })
  const [isSubmit, setIsSubmit] = useState(false)
  const [error, setError] = useState('')
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

  const onSubmit = (values: FP) => {
    reCaptchaRef.current
      .executeAsync()
      .then((value: string) => {
        if (value && !expired) {
          const payload: FP = {
            Password: values.Password,
            ProcessId: values.ProcessId
          }
          dispatch(resetPasswordRequest(payload))
        }
      })
      .catch((err: any) => {})
  }

  useEffect(() => {
    const {
      isResettingPassword,
      resetPasswordSuccess,
      resetPasswordError,
      resetError
    } = auth
    setIsSubmit(isResettingPassword)

    if (resetPasswordSuccess) {
      history.push(path.login)
    }
    if (resetPasswordError) {
      setError(resetError)
    }
  }, [auth, history])

  const handleRecaptcha = useCallback((value) => {
    if (value === null) setExpired(true)
  }, [])

  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <Language />
        <ResetPasswordForm
          values={values}
          onSubmit={onSubmit}
          isSubmit={isSubmit}
          error={error}
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

export default withRouter(ResetPassword)
