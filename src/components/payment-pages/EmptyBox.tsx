import React from 'react';
import { Empty } from 'antd';

interface EmptyBoxProps {
  header: string;
  description: string;
  image: string;
}

export const EmptyBox: React.FC<EmptyBoxProps> = ({
  header,
  description,
  image,
  children,
}) => {
  return (
    <Empty
      className="no-data-field"
      image={image}
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
    >
      {children}
    </Empty>
  );
};
