import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home/Home';
import SingleProduct from './../Products/SingleProduct';
import Profile from './../Profile/Profile';
import SingleCategory from './../Categories/SingleCategory';
import Cart from './../Cart/Cart';

const AppRoutes = () => (
  <Routes>
    <Route index element={<Home />}/>
    <Route path={'/products/:id'} element={<SingleProduct />} />
    <Route path={'/profile'} element={<Profile />} />
    <Route path={'/categories/:id'} element={<SingleCategory />} />
    <Route path={'/cart'} element={<Cart />} />
  </Routes>
);

export default AppRoutes