import React, { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { withRouter } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { Layout, Spin, Row } from 'antd'
import { appSelector } from '../helpers/appSelector'
import { AppDispatch } from '../helpers/appDispatch'
import { TransactionReport } from '../interfaces'
import { getOverviewRequest, clearPaymentData } from '../store/home'
import { isEmpty } from '../helpers/isEmpty'
import { getCurrentUser } from '../store/settings'

const Overview = lazy(() => import('../components/dashboard/Overview'))
const LiveFilter = lazy(() => import('../components/dashboard/LiveFilter'))
const EmptyBox = lazy(() => import('../components/dashboard/EmptyBox'))

const { Content } = Layout

const Dashboard = () => {
  const dispatch: AppDispatch = useDispatch()
  const { t } = useTranslation()
  const { user } = appSelector((state) => state.auth)
  const { client } = appSelector((state) => state.settings)
  const home = appSelector((state) => state.home)
  const [loading, setLoading] = useState(false)
  const [currency, setCurrency] = useState('USD')
  const [fixedPeriod, setFixedPeriod] = useState('daily')
  const [trxReports, setTrxReports] = useState<TransactionReport | null>(null)
  const [params] = useState({
    currency: currency,
    fixedPeriod: fixedPeriod
  })

  useEffect(() => {
    // fetch transaction history
    dispatch(clearPaymentData())
    dispatch(getOverviewRequest(params))
    if (user && isEmpty(client)) {
      dispatch(getCurrentUser(user.userId))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { loading, trxReports } = home
    setLoading(loading)
    setTrxReports(trxReports)
  }, [home])

  const onReloadTransaction = useCallback(() => {
    dispatch(clearPaymentData())
    dispatch(getOverviewRequest(params))
  }, [dispatch, params])

  const onSelectCurrency = useCallback(
    (value: string) => {
      setCurrency(value)
      params.currency = value
      dispatch(getOverviewRequest(params))
    },
    [dispatch, params]
  )

  const onSelectPeriod = useCallback(
    (value: string) => {
      setFixedPeriod(value)
      params.fixedPeriod = value
      dispatch(getOverviewRequest(params))
    },
    [dispatch, params]
  )

  const onRefreshPage = useCallback(() => {
    dispatch(getOverviewRequest(params))
  }, [dispatch, params])

  let container: React.ReactNode
  if (loading) {
    container = (
      <Row className="suspense-container">
        <Spin style={{ marginTop: '200px' }} />
      </Row>
    )
  }

  if (!loading && !trxReports) {
    container = (
      <EmptyBox onReloadTransaction={onReloadTransaction} translate={t} />
    )
  }
  if (!loading && trxReports) {
    container = (
      <Overview
        trxReports={trxReports}
        userRoles={user!.roles}
        currency={currency}
        fixedPeriod={fixedPeriod}
        loading={loading}
        translate={t}
      />
    )
  }

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense
          fallback={
            <Row className="suspense-container">
              <div style={{ marginTop: '200px' }}>
                <Spin />
              </div>
            </Row>
          }
        >
          <LiveFilter
            onSelectCurrency={onSelectCurrency}
            currency={currency}
            fixedPeriod={fixedPeriod}
            onSelectPeriod={onSelectPeriod}
            onRefreshPage={onRefreshPage}
            translate={t}
          />
          {container}
        </Suspense>
      </Content>
    </div>
  )
}

export default withRouter(Dashboard)
