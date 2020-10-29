import React from 'react';
import { withRouter } from 'react-router-dom';
import { NotFound } from '../components/not-found/404';

const NotFoundPage: React.FC = () => {
  return <NotFound />;
};

export default withRouter(NotFoundPage);
