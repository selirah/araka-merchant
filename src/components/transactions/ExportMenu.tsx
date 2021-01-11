import React from 'react';
import { Menu, Dropdown, Button } from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface ExportMenuProps {
  onExportClick(type: string): void;
  isExporting: boolean;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({
  onExportClick,
  isExporting,
}) => {
  const { t } = useTranslation();

  const menu = (
    <Menu>
      <Menu.Item>
        <button
          onClick={() => onExportClick('EXCEL')}
          className="transparent-button"
        >
          <FileExcelOutlined /> Excel
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          onClick={() => onExportClick('PDF')}
          className="transparent-button"
        >
          <FilePdfOutlined /> PDF
        </button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu} placement="bottomCenter" arrow>
      <Button
        className="export-button"
        icon={isExporting ? <LoadingOutlined /> : <DownloadOutlined />}
      >
        {t('transactions.exportMenu.export')}
      </Button>
    </Dropdown>
  );
};
