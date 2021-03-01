import React from 'react';
import { Empty, Card } from 'antd';

interface EmptyBoxProps {
  header: string;
  description: string;
}

const EmptyBox: React.FC<EmptyBoxProps> = ({ header, description }) => {
  return (
    <Card>
      <Empty
        className="no-data-field"
        imageStyle={{
          height: 100,
        }}
        description={
          <React.Fragment>
            <span
              style={{
                textAlign: 'center',
                display: 'block',
                fontSize: '1.3em',
                marginBottom: '0.5em',
                fontWeight: 'bold',
              }}
            >
              {header}
            </span>
            {description}
          </React.Fragment>
        }
      />
    </Card>
  );
};

export default EmptyBox;
