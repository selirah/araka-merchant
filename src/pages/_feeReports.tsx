import React, { lazy, Suspense, useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Spin, Row, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { appSelector } from '../helpers/appSelector'
import { AppDispatch } from '../helpers/appDispatch'
import { MerchantData, PCESReport, PCESTableData } from '../interfaces'
import {
  getMerchantsRequest,
  exportPCESRequest,
  getPCESRequest,
  clearData
} from '../store/reports'
import moment from 'moment'
import { isEmpty } from '../helpers/isEmpty'
import { useTranslation } from 'react-i18next'

const { Content } = Layout

const Filters = lazy(() => import('../components/fee-reports/Filters'))
const Cards = lazy(() => import('../components/fee-reports/Cards'))
const Details = lazy(() => import('../components/fee-reports/Details'))
const CurrencyFilter = lazy(
  () => import('../components/fee-reports/CurrencyFilter')
)
const EmptyBox = lazy(() => import('../components/fee-reports/EmptyBox'))

const FeeReports = () => {
  const dispatch: AppDispatch = useDispatch()
  const { t } = useTranslation()
  const reports = appSelector((state) => state.reports)
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants)
  const [pces, setPces] = useState<PCESTableData[]>([])
  const [loading, setLoading] = useState(false)
  const [pcesReport, setPcesReport] = useState<PCESReport | null>(null)
  const [merchant, setMerchant] = useState<MerchantData | null>(null)
  const [periodFrom, setPeriodFrom] = useState('')
  const [periodTo, setPeriodTo] = useState('')
  const [exportType, setExportType] = useState('')
  const [isExporting, setIsExporting] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [skip, setSkip] = useState(0)
  const [currency, setCurrency] = useState('USD')
  const [isSearching, setIsSearching] = useState(false)

  const params = {
    currency: currency,
    pageSize: pageSize,
    skip: skip,
    periodFrom: periodFrom,
    periodTo: periodTo,
    merchant: merchant ? merchant.name : '',
    exportType: exportType,
    status: 'APPROVED',
    fixedPeriod: 'overall'
  }

  useEffect(() => {
    const { merchants } = reports
    dispatch(clearData())
    // dispatch(getPCESRequest(params))
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { merchants, loading, pces, isExporting } = reports
    setPces(pces && !isEmpty(pces.data) ? pces.data : [])
    setMerchants(merchants)
    setPcesReport(pces)
    setIsExporting(isExporting)
    setLoading(loading)
  }, [reports])

  const reloadReport = () => {
    dispatch(clearData())
    dispatch(getPCESRequest(params))
  }

  const onSelectCurrency = (value: string) => {
    setCurrency(value)
    params.skip = skip
    params.currency = value
    dispatch(clearData())
    dispatch(getPCESRequest(params))
  }

  const onLoadMore = (page: any, size: any) => {
    setSkip(0)
    setPageSize(size)
    params.skip = page - 1
    setSkip(params.skip)
    dispatch(getPCESRequest(params))
  }

  const onSearch = (values: any) => {
    setIsSearching(true)
    const { merchant, periodFrom, periodTo } = values
    let pFrom: string = '',
      pTo: string = ''
    let m: MerchantData | undefined = undefined

    if (!isEmpty(periodFrom) && !isEmpty(periodTo)) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY')
      pTo = moment(periodTo).format('MM/DD/YYYY')
      setPeriodFrom(pFrom)
      setPeriodTo(pTo)
    }
    if (!isEmpty(merchant)) {
      m = merchants.find((m) => m.merchantId === merchant)
      if (m !== undefined) {
        setMerchant(m)
      }
    }
    params.periodFrom = pFrom
    params.periodTo = pTo
    params.merchant = m !== undefined ? m.name : ''
    dispatch(clearData())
    dispatch(getPCESRequest(params))
  }

  const onReset = (form: any) => {
    form.resetFields()
    params.periodFrom = ''
    params.periodTo = ''
    params.merchant = ''
    setIsSearching(false)
    // dispatch(getPCESRequest(params))
  }

  const onExportClick = (type: string) => {
    setExportType(type)
    params.exportType = type
    dispatch(exportPCESRequest(params))
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
          <Fragment>
            <Filters
              onReset={onReset}
              onSearch={onSearch}
              merchants={merchants}
              translate={t}
            />
            {isSearching ? (
              <Fragment>
                <Cards
                  pces={pces}
                  pcesReport={pcesReport}
                  currency={currency}
                  loading={loading}
                  translate={t}
                />
                <CurrencyFilter
                  onSelectCurrency={onSelectCurrency}
                  translate={t}
                />
                <div className="margin-top">
                  <Row style={{ position: 'relative' }}>
                    <h4 className="transaction-chart-text">
                      {t('general.FEEReports')}
                    </h4>
                    <div className="utility-buttons">
                      <>
                        <Button
                          type="primary"
                          className="export-buttons"
                          onClick={() => onExportClick('EXCEL')}
                          loading={isExporting && exportType === 'EXCEL'}
                          disabled={isEmpty(pces)}
                        >
                          {t('general.export-excel')}
                        </Button>
                        {/* <Button
                    type="primary"
                    className="export-buttons"
                    onClick={() => onExportClick('PDF')}
                    loading={isExporting && exportType === 'PDF'}
                    disabled={isEmpty(pces)}
                  >
                    {t('general.export-pdf')}
                  </Button> */}
                      </>
                      <Button
                        type="primary"
                        className="export-buttons reload"
                        onClick={() => reloadReport()}
                      >
                        {t('general.refresh')}
                      </Button>
                    </div>
                  </Row>
                  <Details
                    pces={pces}
                    currency={currency}
                    loading={loading}
                    onLoadMore={onLoadMore}
                    total={pcesReport ? pcesReport.totalMerchants : 0}
                    // total={pces.length}
                    translate={t}
                  />
                </div>
              </Fragment>
            ) : (
              <EmptyBox header={t('general.filterToGetData')} description="" />
            )}
          </Fragment>
        </Suspense>
      </Content>
    </div>
  )
}

export default withRouter(FeeReports)
