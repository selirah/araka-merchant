import React from 'react'
import { Row, Col } from 'antd'
import CardView from '../cards/CardView'
import { Transaction } from '../../interfaces'
import { getAreaOptions } from '../../helpers/functions'

interface TransactionSummaryCardsProps {
  trxReports: Transaction | null
  currency: string
  loading: boolean
  translate: any
}

const TransactionCards: React.FC<TransactionSummaryCardsProps> = ({
  trxReports,
  currency,
  loading,
  translate
}) => {
  const totalTrx = trxReports
    ? getAreaOptions(
        trxReports.total.graph.labels.reverse(),
        trxReports.total.graph.values.reverse(),
        '#FBC02D',
        '#FFF176'
      )
    : {}

  const totalAmountApproved = trxReports
    ? getAreaOptions(
        trxReports.totalAmountApproved.graph.labels.reverse(),
        trxReports.totalAmountApproved.graph.values.reverse(),
        '#FBC02D',
        '#FFF176'
      )
    : {}
  const totalAmountDeclined = trxReports
    ? getAreaOptions(
        trxReports.totalAmountDeclined.graph.labels.reverse(),
        trxReports.totalAmountDeclined.graph.values.reverse(),
        '#FBC02D',
        '#FFF176'
      )
    : {}

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">
          {translate('general.transactionsOverview')}
        </h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.transactions')}
                title={trxReports ? trxReports.total.value : 0}
                data={totalTrx}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.approved')}
                title={trxReports ? trxReports.totalAmountApproved.value : 0}
                data={totalAmountApproved}
                loading={loading}
                currency={currency}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.declined')}
                title={trxReports ? trxReports.totalAmountDeclined.value : 0}
                data={totalAmountDeclined}
                loading={loading}
                currency={currency}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}

export default TransactionCards
