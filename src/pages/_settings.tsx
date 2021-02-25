import React, { lazy, Suspense, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Spin, Row, Col, message } from 'antd';
import { useDispatch } from 'react-redux';
import { appSelector } from '../helpers/appSelector';
import { AppDispatch } from '../helpers/appDispatch';
import {
  getCurrentUser,
  changePasswordRequest,
  clearSomeBooleans,
  updateUserRequest,
} from '../store/settings';
import { isEmpty } from '../helpers/isEmpty';
import { Clock } from '../utils/clock';

const { Content } = Layout;

const UserProfile = lazy(() => import('../components/settings/UserProfile'));

export const Settings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { user } = appSelector((state) => state.auth);
  const {
    client,
    isSubmitting,
    isChangingPassword,
    editSuccess,
    changePasswordSuccess,
    changePasswordFailure,
    error,
    editFailure,
  } = appSelector((state) => state.settings);
  const { time } = Clock();

  useEffect(() => {
    dispatch(clearSomeBooleans());
    if (user && isEmpty(client)) {
      // fetch user details
      dispatch(getCurrentUser(user.userId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onUpdateProfile = (values: any) => {
    dispatch(updateUserRequest(values));
  };

  const onChangePassword = (values: any) => {
    dispatch(changePasswordRequest(values));
  };

  useEffect(() => {
    if (changePasswordFailure) {
      message.error(JSON.stringify(error));
    }
    if (changePasswordSuccess) {
      message.success('Password changed successfully');
    }
    if (editSuccess) {
      message.success('You details have been updated');
    }
    if (editFailure) {
      message.error(JSON.stringify(error));
    }
  }, [
    changePasswordFailure,
    changePasswordSuccess,
    error,
    editFailure,
    editSuccess,
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
          <Row gutter={10}>
            <Col span={24}>
              <div className="upper-header">
                <h4>PROFILE</h4>
                <h6>{time}</h6>
              </div>
            </Col>
          </Row>
          <div className="margin-top settings-page">
            <UserProfile
              onUpdateProfile={onUpdateProfile}
              isSubmitting={isSubmitting}
              isChangingPassword={isChangingPassword}
              onChangePassword={onChangePassword}
              user={user}
            />
          </div>
        </Suspense>
      </Content>
    </div>
  );
};

export default withRouter(Settings);
