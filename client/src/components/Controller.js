import React from 'react';
import AddProduct from './products/AddProduct';
import UserControl from './users/UserControl';
import KindergartensControl from './kindergartens/KindergartensControl';

const Controller = () => {
  return <div>
    <KindergartensControl/>
    <UserControl/>
    <AddProduct/>
  </div>;
};

export default Controller;
