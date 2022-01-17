import React from 'react'
import { TransactionHistory } from '../../interfaces'
import { Tag, Table } from 'antd'
import { transactionStatus } from '../../helpers/constants'
import moment from 'moment'

interface TransactionsProps {
  transactions: TransactionHistory[]
}

interface DataSource {
  key: number
  amount: string
  transactionId: number
  reference: string
  date: string
  status: string
  merchant: string
}

export const Transactions: React.FC<TransactionsProps> = ({ transactions }) => {
  const columns: any[] = [
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center'
    },
    // {
    //   title: 'Reference',
    //   dataIndex: 'customer',
    //   key: 'customer',
    //   align: 'center',
    // },
    {
      title: 'Transaction ID',
      dataIndex: 'transactionId',
      key: 'trasactionId',
      align: 'center'
    },
    {
      title: 'Paid on',
      dataIndex: 'date',
      key: 'date',
      align: 'center'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      render: (status: string) => {
        let color: string = 'geekblue'
        switch (status) {
          case transactionStatus.APPROVED:
            color = 'green'
            break
          case transactionStatus.DECLINED:
            color = 'volcano'
            break
          case transactionStatus.CANCELED:
            color = 'geekblue'
            break
          default:
            color = 'geekblue'
            break
        }
        return (
          <Tag color={color} key={status}>
            {status ? status.toUpperCase() : 'N/A'}
          </Tag>
        )
      }
    },
    {
      title: 'Merchant',
      dataIndex: 'merchant',
      key: 'merchant',
      align: 'left'
    }
  ]

  let dataSource: DataSource[] = []

  for (let transaction of transactions) {
    dataSource.push({
      key: transaction.transactionId,
      amount: `${transaction.currency} ${transaction.amountPaid.toFixed(2)}`,
      transactionId: transaction.transactionId,
      reference: '',
      date: moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss').format(
        'MMMM D, YYYY (h:mm a)'
      ),
      status: transaction.status,
      merchant: transaction.merchant
    })
  }
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      pagination={{ pageSize: 10 }}
    />
  )
}
