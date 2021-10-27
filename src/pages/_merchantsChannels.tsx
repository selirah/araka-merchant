import React, { lazy, Suspense, useEffect, useState, Fragment } from 'react'
import { withRouter } from 'react-router-dom'
import { Layout, Spin, Row, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { appSelector } from '../helpers/appSelector'
import { AppDispatch } from '../helpers/appDispatch'
import {
  getMerchantsChannels,
  exportChannelsRequest
} from '../store/merchant-channels'
import { isEmpty } from '../helpers/isEmpty'
import {
  MerchantChannel,
  MerchantData,
  MerchantChannelReport
} from '../interfaces'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { getMerchantsRequest } from '../store/reports'

const Filters = lazy(() => import('../components/merchants-channels/Filters'))
const Details = lazy(() => import('../components/merchants-channels/Details'))
const CurrencyFilter = lazy(
  () => import('../components/merchants-channels/CurrencyFilter')
)
const EmptyBox = lazy(() => import('../components/merchants-channels/EmptyBox'))

const { Content } = Layout

const MerchantsChannels = () => {
  const dispatch: AppDispatch = useDispatch()
  const { t } = useTranslation()
  const channelStore = appSelector((state) => state.channels)
  const reports = appSelector((state) => state.reports)
  const [channelReport, setChannelReport] =
    useState<MerchantChannelReport | null>(null)
  const [channels, setChannels] = useState<MerchantChannel[]>([])
  const [merchants, setMerchants] = useState<MerchantData[]>(reports.merchants)
  const [exportType, setExportType] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [merchant, setMerchant] = useState<MerchantData | null>(null)
  const [currency, setCurrency] = useState('USD')
  const [loading, setLoading] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [pageSize, setPageSize] = useState(10)
  const [skip, setSkip] = useState(0)
  const [isSearching, setIsSearching] = useState(false)

  const params = {
    currency: currency,
    periodFrom: fromDate,
    periodTo: toDate,
    merchant: merchant ? merchant.name : null,
    exportType: exportType,
    pageSize: pageSize,
    skip: skip,
    fixedPeriod: 'overall',
    reportType: null,
    product: null,
    status: null,
    channel: null,
    searchValue: null
  }

  useEffect(() => {
    const { merchants } = reports
    if (isEmpty(merchants)) {
      dispatch(getMerchantsRequest())
    }
    // dispatch(getMerchantsChannels(params))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const { loading, channels, isExporting } = channelStore
    const { merchants } = reports
    setLoading(loading)
    setChannels(channels && !isEmpty(channels.data) ? channels.data : [])
    setChannelReport(channels)
    setMerchants(merchants)
    setIsExporting(isExporting)
  }, [channelStore, reports])

  const reloadChannels = () => {
    dispatch(getMerchantsChannels(params))
  }

  const onExportClick = (type: string) => {
    setExportType(type)
    params.exportType = type
    dispatch(exportChannelsRequest(params))
  }

  const onLoadMore = (page: any, size: any) => {
    setSkip(0)
    setPageSize(size)
    params.skip = page - 1
    setSkip(params.skip)
    dispatch(getMerchantsChannels(params))
  }

  const onReset = (form: any) => {
    form.resetFields()
    params.periodFrom = ''
    params.periodTo = ''
    params.merchant = ''
    setIsSearching(false)
  }

  const onSelectCurrency = (value: string) => {
    setCurrency(value)
    params.currency = value
    dispatch(getMerchantsChannels(params))
  }

  const onSearch = (values: any) => {
    setIsSearching(true)
    const { periodFrom, periodTo, merchant } = values
    let m: MerchantData | undefined = undefined
    let pFrom: string = '',
      pTo: string = ''
    if (periodFrom !== undefined && periodTo !== undefined) {
      pFrom = moment(periodFrom).format('MM/DD/YYYY')
      pTo = moment(periodTo).format('MM/DD/YYYY')
      setFromDate(pFrom)
      setToDate(pTo)
    }
    if (merchant !== undefined) {
      m = merchants.find((m) => m.merchantId === merchant)
      setMerchant(m !== undefined ? m : null)
    }
    params.periodFrom = pFrom
    params.periodTo = pTo
    params.merchant = m !== undefined ? m.name : null
    dispatch(getMerchantsChannels(params))
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
                <div className="margin-top">
                  <Row style={{ position: 'relative' }}>
                    <h4 className="transaction-chart-text">
                      {t('general.merchantsTable')}
                    </h4>
                    <div className="utility-buttons">
                      <>
                        <Button
                          type="primary"
                          className="export-buttons"
                          onClick={() => onExportClick('EXCEL')}
                          loading={isExporting && exportType === 'EXCEL'}
                          disabled={!channels.length}
                        >
                          {t('general.export-excel')}
                        </Button>
                      </>
                      <Button
                        type="primary"
                        className="export-buttons reload"
                        onClick={() => reloadChannels()}
                      >
                        {t('general.refresh')}
                      </Button>
                    </div>
                  </Row>
                  <CurrencyFilter
                    onSelectCurrency={onSelectCurrency}
                    translate={t}
                  />
                  <Details
                    channels={channels}
                    currency={currency}
                    loading={loading}
                    onLoadMore={onLoadMore}
                    total={channelReport ? channelReport.totalRecords : 0}
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

export default withRouter(MerchantsChannels)
