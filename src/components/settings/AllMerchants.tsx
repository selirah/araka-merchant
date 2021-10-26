import React from 'react';
import { Row, Col, Table, Button, Alert } from 'antd';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../helpers/appDispatch';
import moment from 'moment-timezone';
import { MerchantData } from '../../interfaces';
import { timeZones } from '../../helpers/constants';
import { updateMerchantStatusRequest } from '../../store/settings';
import { appSelector } from '../../helpers/appSelector';

interface AllMerchantsProps {
  translate: any;
  merchants: MerchantData[];
}

const AllMerchants: React.FC<AllMerchantsProps> = ({
  translate,
  merchants,
}) => {
  const { updateMerchantError } = appSelector((state) => state.settings)
  const dispatch: AppDispatch = useDispatch()
  const updateMerchant = (obj: any) => {
    const { emailAddress, isActive } = obj
    const payload: any = {}
    if (isActive) {
      payload.EmailAddress = emailAddress;
      payload.IsActive = false
    } else {
      payload.EmailAddress = emailAddress;
      payload.IsActive = true
    }
    dispatch(updateMerchantStatusRequest(payload))
  }

  const columns: any = [
    {
      title: `${translate('general.customer')}`,
      dataIndex: 'name',
      key: 'name',
      className: 'column-text',
    },
    {
      title: `${translate('general.createdAt')}`,
      dataIndex: 'createdWhen',
      key: 'createdWhen',
      className: 'column-text',
      render: (createdWhen: string) => {
        const d = moment(createdWhen)
          .tz(timeZones.kinshasa)
          .format(`MM/DD/YYYY (h:mm a)`);
        return <span>{d}</span>;
      }
    },
    {
      title: `${translate('general.status')}`,
      dataIndex: 'isActive',
      key: 'isActive',
      className: 'columns-text',
      render: (isActive: boolean) => {
        const d = isActive ? 'ACTIVE' : 'INACTIVE';
        return <span>{d}</span>
      }
    },
    {
      title: `${translate('general.actions')}`,
      key: 'row',
      render: (row: any) => {
        const actionButtons = row.isActive ? <><Button type="primary" danger onClick={() => updateMerchant(row)}>DEACTIVATE</Button></>: <><Button type="primary" onClick={() => updateMerchant(row)}>ACTIVATE</Button></>;
        return <span>{actionButtons}</span>
      }
    }
  ]

  return (
    <Row justify="center" align="middle">
      <Col span={24} className="profile-box">
        <h3>{translate('general.allMerchants')}</h3>
        <Row>
          <Col span={24}>
            {updateMerchantError && (<Alert message={updateMerchantError} type="error" closable />)}
            <Table
              dataSource={merchants}
              columns={columns}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default AllMerchants;