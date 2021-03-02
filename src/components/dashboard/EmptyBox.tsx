import React from 'react';
import { Empty, Button, Card } from 'antd';

interface EmptyBoxProps {
  onReloadTransaction(): void;
}

const EmptyBox: React.FC<EmptyBoxProps> = ({ onReloadTransaction }) => {
  return (
    <Card className="margin-top-big">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={<span>No transaction has been performed yet</span>}
        style={{ marginTop: '200px', marginBottom: '200px' }}
      >
        <Button
          type="primary"
          className="empty-box-button"
          onClick={() => onReloadTransaction()}
        >
          Try Again
        </Button>
      </Empty>
    </Card>
  );
};

export default EmptyBox;
