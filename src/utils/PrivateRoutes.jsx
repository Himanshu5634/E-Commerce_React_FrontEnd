import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { handleShowLogin } from '../Features/loginPopup';


const PrivateRoutes = ({children}) => {

    const isAuthenticated = localStorage.getItem("token")
    const loginPopup = useSelector((state) => state.loginPopupSlice.showLogin);
    console.log(loginPopup);

    const dispatch = useDispatch()
    
  return  isAuthenticated ? children : dispatch(handleShowLogin(true));
}

export default PrivateRoutes
