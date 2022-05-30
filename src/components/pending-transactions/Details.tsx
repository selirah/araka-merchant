import React from 'react'
import { Row, Col, Table } from 'antd'
import { PendingTransactionsTableData } from '../../interfaces'
import { amountSeparator } from '../../helpers/helperFunctions'

interface DetailsProps {
  pendingTransactions: PendingTransactionsTableData[]
  currency: string
  loading: boolean
  onLoadMore(page: any, pageSize: any): void
  total: number
  translate: any
}

const Details: React.FC<DetailsProps> = ({
  pendingTransactions,
  currency,
  loading,
  onLoadMore,
  total,
  translate
}) => {
  const columns: any = [
    {
      title: `${translate('general.transactionId')}`,
      dataIndex: 'transactionId',
      key: 'transactionId',
      align: 'center',
      className: 'column-text',
      render: (transactionId: string) => {
        return <span style={{ color: '#35b9e6' }}>{transactionId}</span>
      }
    },
    {
      title: `${translate('general.paymentGatewayReference')}`,
      dataIndex: 'paymentGatewayReference',
      key: 'paymentGatewayReference',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.transactionDate')}`,
      dataIndex: 'transactionDate',
      key: 'transactionDate',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.amountPaid')}`,
      dataIndex: 'amountPaid',
      key: 'amountPaid',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.fee')}`,
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.vat')}`,
      dataIndex: 'vat',
      key: 'vat',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.currency')}`,
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.customer')}`,
      dataIndex: 'customer',
      key: 'customer',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.channel')}`,
      dataIndex: 'channel',
      key: 'channel',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.product')}`,
      dataIndex: 'product',
      key: 'product',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.merchant')}`,
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'center',
      className: 'column-text'
    }
  ]

  let dataSource: any = []

  pendingTransactions.map((v) => {
    dataSource.push({
      key: Math.random(),
      transactionId: v.transactionId,
      paymentGatewayReference: v.paymentGatewayReference,
      transactionDate: v.transactionDate,
      amountPaid: `${currency} ${parseFloat(v.amountPaid).toFixed(4)}`,
      fee: `${currency} ${amountSeparator(parseFloat(v.fee).toFixed(4))}`,
      vat: `${currency} ${amountSeparator(parseFloat(v.vat).toFixed(4))}`,
      currency: v.currency,
      customer: v.customer,
      channel: v.channel,
      product: v.product,
      merchant: v.merchant
    })
    return dataSource
  })

  return (
    <Row gutter={20}>
      <Col span={24}>
        <div className="table-padding">
          <Table
            dataSource={dataSource}
            columns={columns}
            bordered
            className="tranaction-table"
            pagination={{
              onChange: (page, pageSize) => {
                onLoadMore(page, pageSize)
              },
              total: total,
              showTotal: (_, range) => {
                const tran = translate(`general.pagination`)
                let t = tran.replace(`%d`, `${range[0]} - ${range[1]}`)
                let s = t.replace(`%s`, total)
                return s
              },
              showSizeChanger: false
            }}
            loading={loading}
          />
        </div>
      </Col>
    </Row>
  )
}

export default Details
