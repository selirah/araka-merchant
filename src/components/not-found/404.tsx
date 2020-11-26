import React from 'react';
import { Background } from './Background';
import './style.css';

const NotFound: React.FC = () => {
  return (
    <section className="container">
      <div className="wrapper">
        <Background />
      </div>
    </section>
  );
};

export { NotFound };
