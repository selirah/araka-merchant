import React from 'react'
import { Row, Col, Tag, Table } from 'antd'
import { MerchantChannel } from '../../interfaces'
import { amountSeparator } from '../../helpers/helperFunctions'

interface DetailsProps {
  channels: MerchantChannel[]
  currency: string
  loading: boolean
  onLoadMore(page: any, pageSize: any): void
  total: number
  translate: any
}

const Details: React.FC<DetailsProps> = ({
  channels,
  currency,
  loading,
  onLoadMore,
  total,
  translate
}) => {
  const sortOverview = (a: MerchantChannel, b: MerchantChannel) => {
    return b.totalAmount - a.totalAmount // descending
  }

  const sortMerchantOverview = (arr: MerchantChannel[]) => {
    arr.sort(sortOverview)

    return arr
  }

  const columns: any = [
    {
      title: `${translate('general.merchant')}`,
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'center',
      className: 'column-text',
      render: (merchant: string) => {
        return (
          <Tag key={merchant} className="table-tag-merchant">
            {merchant}
          </Tag>
        )
      }
    },
    {
      title: `${translate('general.Payment Gateway')}`,
      dataIndex: 'paymentGateway',
      key: 'paymentGateway',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.Total Amount')}`,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.Total Fees')}`,
      dataIndex: 'totalFees',
      key: 'totalFees',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Item Cost')}`,
      dataIndex: 'itemCost',
      key: 'itemCost',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Net Amount')}`,
      dataIndex: 'netAmount',
      key: 'netAmount',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Fee')}`,
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `VAT`,
      dataIndex: 'vat',
      key: 'vat',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Gateway Share')}`,
      dataIndex: 'paymentGetewayShare',
      key: 'paymentGetewayShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Merchant Share')}`,
      dataIndex: 'parentMerchantShare',
      key: 'parentMerchantShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.Platform Share')}`,
      dataIndex: 'platformShare',
      key: 'platformShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    }
  ]

  let dataSource: any = []
  channels = sortMerchantOverview(channels)

  channels.map((channel) => {
    dataSource.push({
      key: Math.random(),
      merchant: channel.merchant,
      paymentGateway: channel.paymentGateway,
      totalAmount: `${currency} ${channel.totalAmount.toFixed(4)}`,
      totalFees: `${currency} ${channel.totalFees.toFixed(4)}`,
      itemCost: `${currency} ${channel.itemCost.toFixed(4)}`,
      netAmount: `${currency} ${channel.netAmount.toFixed(4)}`,
      fee: `${currency} ${amountSeparator(channel.fee.toFixed(4))}`,
      vat: `${currency} ${amountSeparator(channel.vat.toFixed(4))}`,
      paymentGetewayShare: `${currency} ${amountSeparator(
        channel.paymentGatewayShare.toFixed(4)
      )}`,
      parentMerchantShare: `${currency} ${amountSeparator(
        channel.parentMerchantShare.toFixed(4)
      )}`,
      platformShare: `${currency} ${amountSeparator(
        channel.platformShare.toFixed(4)
      )}`
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
