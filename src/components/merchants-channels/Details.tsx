import React from 'react'
import { Row, Col, Tag, Table } from 'antd'
import { MerchantChannel } from '../../interfaces'
import { numberWithCommas } from '../../helpers/helperFunctions'

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
      title: `Payment Gateway`,
      dataIndex: 'paymentGateway',
      key: 'paymentGateway',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `Total Amount`,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `Total Fees`,
      dataIndex: 'totalFees',
      key: 'totalFees',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `Item Cost`,
      dataIndex: 'itemCost',
      key: 'itemCost',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `Net Amount`,
      dataIndex: 'netAmount',
      key: 'netAmount',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `Fee`,
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
      title: `Gateway Share`,
      dataIndex: 'paymentGetewayShare',
      key: 'paymentGetewayShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `Merchant Share`,
      dataIndex: 'parentMerchantShare',
      key: 'parentMerchantShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `Platform Share`,
      dataIndex: 'platformShare',
      key: 'platformShare',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    }
  ]

  let dataSource = []
  channels = sortMerchantOverview(channels)
  for (let channel of channels) {
    dataSource.push({
      key: channel.merchantId,
      merchant: channel.merchant,
      paymentGateway: channel.paymentGateway,
      totalAmount: `${currency} ${numberWithCommas(
        channel.totalAmount.toFixed(2)
      )}`,
      totalFees: `${currency} ${numberWithCommas(
        channel.totalFees.toFixed(2)
      )}`,
      itemCost: `${currency} ${numberWithCommas(channel.itemCost.toFixed(2))}`,
      netAmount: `${currency} ${numberWithCommas(
        channel.netAmount.toFixed(2)
      )}`,
      fee: `${currency} ${numberWithCommas(channel.fee.toFixed(2))}`,
      vat: `${currency} ${numberWithCommas(channel.vat.toFixed(2))}`,
      paymentGetewayShare: `${currency} ${numberWithCommas(
        channel.paymentGatewayShare.toFixed(2)
      )}`,
      parentMerchantShare: `${currency} ${numberWithCommas(
        channel.parentMerchantShare.toFixed(2)
      )}`,
      platformShare: `${currency} ${numberWithCommas(
        channel.platformShare.toFixed(2)
      )}`
    })
  }

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
