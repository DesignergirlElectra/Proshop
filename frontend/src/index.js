import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Route, RouterProvider,createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import HomeScreen from './Screens/HomeScreen';
import ProductScreen from './Screens/ProductScreen';
import {Provider} from 'react-redux';
import store from './store';
import CartScreen from './Screens/CartScreen';
import LoginScreen from './Screens/LoginScreen';
import RegisterScreen from './Screens/RegisterScreen'
import ShippingScreen from './Screens/ShippingScreen';
import PrivateRoute from './Components/PrivateRoute'
import PaymentScreen from './Screens/PaymentScreen';
import PlaceOrderScreen from './Screens/PlaceOrderScreen';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route index={true} path = '/' element={<HomeScreen/>}/>
      <Route path = '/product/:id' element={<ProductScreen/>}/>
      <Route path = '/cart' element = {<CartScreen/>}/>
      <Route path = '/login' element = {<LoginScreen/>}/>
      <Route path ='/register' element = {<RegisterScreen/>}/>
      {/* <Route path ='/shipping' element = {<ShippingScreen/>}/> */}
      <Route path ='' element = {<PrivateRoute/>}>
        <Route path ='/shipping' element = {<ShippingScreen/>}/>
        <Route path ='/payment' element = {<PaymentScreen/>}/>
        <Route path ='/placeorder' element = {<PlaceOrderScreen/>}/>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
