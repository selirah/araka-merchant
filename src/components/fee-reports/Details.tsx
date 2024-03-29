import React from 'react'
import { Row, Col, Table } from 'antd'
import { PCESTableData } from '../../interfaces'
import { amountSeparator } from '../../helpers/helperFunctions'

interface DetailsProps {
  pces: PCESTableData[]
  currency: string
  loading: boolean
  onLoadMore(page: any, pageSize: any): void
  total: number
  translate: any
}

const Details: React.FC<DetailsProps> = ({
  pces,
  currency,
  loading,
  onLoadMore,
  total,
  translate
}) => {
  const columns: any = [
    {
      title: `${translate('general.merchant')}`,
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'center',
      className: 'column-text',
      render: (merchant: string) => {
        return <span style={{ color: '#35b9e6' }}>{merchant}</span>
      }
    },
    {
      title: `${translate('general.totalTransactions')}`,
      dataIndex: 'totalTransactions',
      key: 'totalTransactions',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.totalAmount')}`,
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.arakaAmount')}`,
      dataIndex: 'arakaAmount',
      key: 'arakaAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.arakaFees')}`,
      dataIndex: 'arakaFees',
      key: 'arakaFees',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.pcesAmount')}`,
      dataIndex: 'pcesAmount',
      key: 'pcesAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.totalNetAmount')}`,
      dataIndex: 'totalNetAmount',
      key: 'totalNetAmount',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.merchantPayout')}`,
      dataIndex: 'merchantPayout',
      key: 'merchantPayout',
      align: 'center',
      className: 'column-text'
    },
    {
      title: `${translate('general.totalVat')}`,
      dataIndex: 'totalVat',
      key: 'totalVat',
      align: 'center',
      className: 'column-text'
    }
  ]

  let dataSource: any = []

  pces.map((v) => {
    dataSource.push({
      key: Math.random(),
      totalTransactions: v.totalTransactions,
      merchant: v.merchant,
      totalAmount: `${currency} ${amountSeparator(v.totalAmount.toFixed(4))}`,
      arakaFees: `${currency} ${amountSeparator(v.totalFees.toFixed(4))}`,
      arakaAmount: `${currency} ${amountSeparator(v.arakaAmount.toFixed(4))}`,
      pcesAmount: `${currency} ${amountSeparator(v.pcesAmount.toFixed(4))}`,
      totalNetAmount: `${currency} ${amountSeparator(
        v.totalNetAmount.toFixed(4)
      )}`,
      merchantPayout: `${currency} ${amountSeparator(
        v.merchantPayout.toFixed(4)
      )}`,
      totalVat: `${currency} ${amountSeparator(v.totalVat.toFixed(4))}`
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
