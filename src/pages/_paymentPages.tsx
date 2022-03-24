import React, { useState, useEffect, lazy, Suspense } from 'react'
import { Layout, Row, Button, message, Spin } from 'antd'
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { appSelector } from '../helpers/appSelector'
import { AppDispatch } from '../helpers/appDispatch'
import { withRouter, useHistory } from 'react-router-dom'
import { PaymentPage } from '../interfaces'
import {
  getPaymentPagesRequest,
  addPaymentPageRequest,
  clearStates,
  clearFee
} from '../store/payment-pages'
import { isEmpty } from '../helpers/isEmpty'
import { path } from '../helpers/path'
import { useTranslation } from 'react-i18next'
import { GetPagesFilteredResult } from '../helpers/page_functions'

const PaymentTypeModal = lazy(
  () => import('../components/payment-pages/PaymentTypeModal')
)
const FormModal = lazy(() => import('../components/payment-pages/FormModal'))
const FilterMenu = lazy(() => import('../components/payment-pages/FilterMenu'))
const Pages = lazy(() => import('../components/payment-pages/Pages'))

const PaymentPages = () => {
  const dispatch: AppDispatch = useDispatch()
  const { pages, loading, isSubmitting, success, failure, error } = appSelector(
    (state) => state.page
  )
  const { Content } = Layout
  const [showPaymentTypeModal, setShowPaymentTypeModal] = useState(false)
  const [showFormModal, setShowFormModal] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  // const [spin, setSpin] = useState(false);

  const [values] = useState<PaymentPage>({
    Amount: '',
    Description: '',
    EmailAddress: true,
    Logo: '',
    PageName: '',
    PhoneNumber: true,
    RedirectUrl: '',
    Currency: 'USD',
    CustomerName: true,
    ProcessId: '',
    TransactionReference: ''
  })
  const [pageData, setPageData] = useState(pages)
  const [isCopied, setIsCopied] = useState(false)
  const [processId, setProcessId] = useState('')
  const { t } = useTranslation()
  const history = useHistory()

  useEffect(() => {
    if (isEmpty(pages)) {
      dispatch(getPaymentPagesRequest())
    }
    dispatch(clearStates())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (success) {
      message.success(`${t('general.pageAddSuccess')}`, 5)
    }
    if (failure) {
      message.error(error, 5)
    }
    setPageData(pages)
  }, [success, error, failure, t, pages])

  const reloadPages = () => {
    dispatch(getPaymentPagesRequest())
  }

  const onTogglePaymentTypeModal = () => {
    setShowPaymentTypeModal(!showPaymentTypeModal)
  }

  const onToggleFormModal = () => {
    setShowFormModal(!showFormModal)
    setImageUrl('')
    dispatch(clearStates())
  }

  const choosePaymentPage = () => {
    onTogglePaymentTypeModal()
    onToggleFormModal()
  }

  const onClickRow = (pageId: number) => {
    history.push(`${path.page}/${pageId}`)
  }

  const beforeUpload = (file: File): boolean => {
    const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'

    if (!isJPGOrPNG) {
      message.error(`${t('general.fileTypeError')}`)
    }

    const isLessThan2MB = file.size / 1024 / 1024 < 2
    if (!isLessThan2MB) {
      message.error(`${t('general.fileSizeError')}`)
    }

    return isJPGOrPNG && isLessThan2MB
  }

  const getBase64 = (img: File, callback: Function) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(img)
  }

  const handleChange = (info: any): void => {
    getBase64(info.file.originFileObj, (imageUrl: any) => {
      setImageUrl(imageUrl)
      // setSpin(false);
    })
  }

  const uploadButton: React.ReactNode = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div className="ant-upload-text">{t('general.chooseFile')}</div>
    </div>
  )

  const onSubmit = (values: PaymentPage) => {
    const payload: PaymentPage = {
      Amount: values.Amount,
      Description: values.Description,
      EmailAddress: values.EmailAddress,
      Logo: imageUrl,
      PageName: values.PageName,
      PhoneNumber: values.PhoneNumber,
      RedirectUrl: values.RedirectUrl,
      Currency: values.Currency,
      CustomerName: values.CustomerName,
      ProcessId: '',
      TransactionReference: ''
    }
    dispatch(addPaymentPageRequest(payload))
  }

  const copyLink = (processId: string) => {
    if (typeof window !== 'undefined') {
      const { location } = window
      const path = `${location.protocol}//${location.host}/payment/${processId}`

      let board = document.createElement('textarea')
      document.body.appendChild(board)
      board.value = path
      board.select()
      document.execCommand('copy')
      document.body.removeChild(board)
      setIsCopied(true)
      setProcessId(processId)
    }
  }

  const onPreviewClick = (processId: string) => {
    const { location } = window
    const path = `${location.protocol}//${location.host}/payment/${processId}`
    dispatch(clearFee())
    window.open(path, '_blank')
  }

  const onReset = (form: any) => {
    form.resetFields()
    setPageData(pages)
  }

  const onSearch = (values: any) => {
    const { bucket } = GetPagesFilteredResult(pages, values)
    setPageData(bucket)
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
          <FilterMenu onReset={onReset} onSearch={onSearch} translate={t} />
          <div className="margin-top">
            <Row style={{ position: 'relative' }}>
              <h4 className="transaction-chart-text">
                {t('general.paymentPage')}
              </h4>
              <div className="utility-buttons">
                <Button
                  type="primary"
                  className="export-buttons"
                  onClick={() => onTogglePaymentTypeModal()}
                >
                  {t('general.newPageText')}
                </Button>
                <Button
                  type="primary"
                  className="export-buttons reload"
                  onClick={() => reloadPages()}
                >
                  {t('general.refresh')}
                </Button>
              </div>
            </Row>
          </div>
          <Pages
            pages={pageData}
            copyLink={copyLink}
            isCopied={isCopied}
            processId={processId}
            onClickRow={onClickRow}
            onPreviewClick={onPreviewClick}
            loading={loading}
            translate={t}
          />
          <PaymentTypeModal
            choosePaymentPage={choosePaymentPage}
            onTogglePaymentTypeModal={onTogglePaymentTypeModal}
            showPaymentTypeModal={showPaymentTypeModal}
            translate={t}
          />
          <FormModal
            onToggleFormModal={onToggleFormModal}
            showFormModal={showFormModal}
            beforeUpload={beforeUpload}
            onChange={handleChange}
            imageUrl={imageUrl}
            uploadButton={uploadButton}
            values={values}
            onSubmit={onSubmit}
            isSubmit={isSubmitting}
            translate={t}
          />
        </Suspense>
      </Content>
    </div>
  )
}

export default withRouter(PaymentPages)
