import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from 'components/Header';

function BaseLayout() {
  return (
    <section>
      <Header />
      <Outlet />
    </section>
  );
}

export default BaseLayout;
