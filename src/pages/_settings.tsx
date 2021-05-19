import React, { lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, message, Tabs, Form } from 'antd';
import { SettingOutlined /*, UserAddOutlined*/ } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getCurrentUser,
  changePasswordRequest,
  clearSomeBooleans,
  updateUserRequest,
  /*createMerchantRequest*/
} from '../store/settings';
import { isEmpty } from '../helpers/isEmpty';
// import { Register } from '../interfaces';
// import { roles } from '../helpers/constants';
import { useTranslation } from 'react-i18next';

const { Content } = Layout;
const { TabPane } = Tabs;

const UserProfile = lazy(() => import('../components/settings/UserProfile'));
// const CreateMerchant = lazy(
//   () => import('../components/settings/CreateMerchant')
// );

// interface Merchant {
//   Name: string;
//   PhoneNumber: {
//     short: string;
//     code: number;
//     phone: string;
//   };
//   EmailAddress: string;
//   Password: string;
//   Confirm: string;
// }

export const Settings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = appSelector((state) => state.auth);
  const [form] = Form.useForm();
  // const initialValues: Merchant = {
  //   Name: '',
  //   Confirm: '',
  //   EmailAddress: '',
  //   Password: '',
  //   PhoneNumber: { short: 'cd', code: 0, phone: '' },
  // };

  const {
    client,
    isSubmitting,
    isChangingPassword,
    editSuccess,
    changePasswordSuccess,
    changePasswordFailure,
    error,
    editFailure,
    createMerchantSuccess,
    /*merchantError,
    singleError,*/
  } = appSelector((state) => state.settings);
  // let role;
  // if (user) {
  //   role = user.roles.find((r) => r === roles.SuperMerchant);
  // } else {
  //   role = roles.SuperMerchant;
  // }

  useEffect(() => {
    if (user && isEmpty(client)) {
      // fetch user details
      dispatch(getCurrentUser(user.userId));
    }
    dispatch(clearSomeBooleans());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateProfile = (values: any) => {
    dispatch(updateUserRequest(values));
  };

  const onChangePassword = (values: any) => {
    dispatch(changePasswordRequest(values));
  };

  // const createMerchant = (values: Merchant) => {
  //   const payload: Register = {
  //     EmailAddress: values.EmailAddress,
  //     IsBusiness: true,
  //     Name: values.Name,
  //     Password: values.Password,
  //     PhoneNumber: `${values.PhoneNumber.code}${values.PhoneNumber.phone}`,
  //   };
  //   dispatch(createMerchantRequest(payload));
  // };

  useEffect(() => {
    if (changePasswordFailure) {
      message.error(JSON.stringify(error));
    }
    if (changePasswordSuccess) {
      message.success(t('general.passwordChanged'));
    }
    if (editSuccess) {
      message.success(t('general.detailsUpdated'));
    }
    if (editFailure) {
      message.error(JSON.stringify(error));
    }
    if (createMerchantSuccess) {
      form.resetFields();
    }
  }, [
    changePasswordFailure,
    changePasswordSuccess,
    error,
    editFailure,
    editSuccess,
    createMerchantSuccess,
    form,
    t,
  ]);

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <Suspense
          fallback={
            <Row className="suspense-container">
              <div style={{ marginTop: '200px' }}>
                <Spin />
              </div>
            </Row>
          }
        >
          <div className="settings-page">
            <Tabs defaultActiveKey="1">
              <TabPane
                tab={
                  <span onClick={() => dispatch(clearSomeBooleans())}>
                    <SettingOutlined /> {t('general.profile')}
                  </span>
                }
                key="1"
              >
                <UserProfile
                  onUpdateProfile={onUpdateProfile}
                  isSubmitting={isSubmitting}
                  isChangingPassword={isChangingPassword}
                  onChangePassword={onChangePassword}
                  user={user}
                  translate={t}
                />
              </TabPane>
              {/* {role !== undefined && role === roles.SuperMerchant ? (
                <TabPane
                  tab={
                    <span onClick={() => dispatch(clearSomeBooleans())}>
                      <UserAddOutlined /> {t('general.createMerchant')}
                    </span>
                  }
                  key="2"
                >
                  <CreateMerchant
                    Form={Form}
                    errors={singleError ? singleError : merchantError}
                    form={form}
                    isSubmitting={isSubmitting}
                    onSubmit={createMerchant}
                    success={createMerchantSuccess}
                    values={initialValues}
                    translate={t}
                  />
                </TabPane>
              ) : null} */}
            </Tabs>
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Settings);
