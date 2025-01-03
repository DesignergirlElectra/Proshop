import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import { Provider } from 'react-redux';
import store from './store';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen';
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute';
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';
import OrderScreen from './Screens/OrderScreen';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import ProfileScreen from './Screens/ProfileScreen';
import OrderListScreen from './Screens/admin/OrderListScreen';
import AdminRoute from './Components/AdiminRoute';
import ProductListScreen from './Screens/admin/ProductListScreen';
import ProductEditScreen from './Screens/admin/ProductEditScreen';
import UsersListScreen from './Screens/admin/UsersListScreen';
import UserEditSceern from './Screens/admin/UserEditScreen';
import { HelmetProvider } from 'react-helmet-async';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/product/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/payment' element={<PaymentScreen />} />
        <Route path='/placeorder' element={<PlaceOrderScreen />} />
        <Route path='/orders/:id' element={<OrderScreen />} />
        <Route path='/profile' element={<ProfileScreen />} />

      </Route>
      <Route element={<AdminRoute />}>
        <Route path='/admin/orderList' element={<OrderListScreen />} />
        <Route path='/admin/productList' element={<ProductListScreen />} />
        <Route path='/admin/productList/:pageNumber' element={<ProductListScreen />} />
        <Route path='/admin/productList/:id/edit' element={<ProductEditScreen />} />
        <Route path='/admin/userList' element={<UsersListScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditSceern />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <Provider store={store}>
        <PayPalScriptProvider deferLoading={true}>
          <RouterProvider router={router} />
        </PayPalScriptProvider>
      </Provider>
    </HelmetProvider>
  </React.StrictMode>
);

// Uncomment to measure app performance
// reportWebVitals(console.log);
