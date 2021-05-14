import React from 'react';
import { Empty, Button, Card } from 'antd';

interface EmptyBoxProps {
  onReloadTransaction(): void;
  translate: any;
}

const EmptyBox: React.FC<EmptyBoxProps> = ({
  onReloadTransaction,
  translate,
}) => {
  return (
    <Card className="margin-top-big">
      <Empty
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{
          height: 60,
        }}
        description={<span>{translate('general.noDataDetails')}</span>}
        style={{ marginTop: '200px', marginBottom: '200px' }}
      >
        <Button
          type="primary"
          className="empty-box-button"
          onClick={() => onReloadTransaction()}
        >
          {translate('general.refresh').toUpperCase()}
        </Button>
      </Empty>
    </Card>
  );
};

export default EmptyBox;
