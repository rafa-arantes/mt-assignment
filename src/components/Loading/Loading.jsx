import React from 'react';
import './styles.scss';

function LoadingScreen() {
  return (
    <div className="centralize-loading center-flex" data-testid="loading">
      <div>
        <div className="lds-ring">
          <div />
          <div />
          <div />
          <div />
        </div>
      </div>
    </div>
  );
}

export default LoadingScreen;
