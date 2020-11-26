import React from 'react';

interface TestMenuProps {}

export const TestMenu: React.FC<TestMenuProps> = () => {
  return (
    <div className="starter-text">
      <p>
        Your business is not activated yet. On the left side of your dashboard,
        go to the Get Started page to learn how to activate your business
      </p>
    </div>
  );
};
