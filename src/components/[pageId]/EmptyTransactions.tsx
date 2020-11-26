import React from 'react';
import { Empty } from 'antd';

interface EmptyTransactionsProps {}

export const EmptyTransactions: React.FC<EmptyTransactionsProps> = () => {
  return (
    <Empty
      imageStyle={{
        height: 100,
        marginTop: 20,
      }}
      description={
        <React.Fragment>
          <span
            style={{
              textAlign: 'center',
              display: 'block',
              fontSize: '1.3em',
              marginBottom: '0.5em',
              fontWeight: 'normal',
            }}
          >
            No transaction
          </span>
          No payments have been made on this page
        </React.Fragment>
      }
    />
  );
};
