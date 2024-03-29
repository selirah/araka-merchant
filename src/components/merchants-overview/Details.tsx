import React from 'react'
import { Row, Col, Tag, Table } from 'antd'
import { MerchantOverview } from '../../interfaces'
import { amountSeparator } from '../../helpers/helperFunctions'

interface DetailsProps {
  overviews: MerchantOverview[]
  currency: string
  loading: boolean
  onLoadMore(page: any, pageSize: any): void
  total: number
  translate: any
}

const Details: React.FC<DetailsProps> = ({
  overviews,
  currency,
  loading,
  onLoadMore,
  total,
  translate
}) => {
  const sortOverview = (a: MerchantOverview, b: MerchantOverview) => {
    return b.totalAmountProcessed - a.totalAmountProcessed // descending
  }

  const sortMerchantOverview = (arr: MerchantOverview[]) => {
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
      title: `${translate('general.totalAmountProcessed')}`,
      dataIndex: 'amountProcessed',
      key: 'amountProcessed',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.totalTransactions')}`,
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text',
      responsive: ['md']
    },
    {
      title: `${translate('general.totalArakaFees')}`,
      dataIndex: 'totalFees',
      key: 'totalFees',
      align: 'center',
      className: 'column-text'
    }
  ]

  let dataSource: any = []
  overviews = sortMerchantOverview(overviews)
  overviews.map((overview) => {
    dataSource.push({
      key: overview.id,
      merchant: overview.merchant,
      amountProcessed: `${currency} ${amountSeparator(
        overview.totalAmountProcessed.toFixed(4)
      )}`,
      totalTransactions: `${overview.totalTransactions}`,
      totalFees: `${currency} ${overview.totalArakaFees.toFixed(4)}`
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
