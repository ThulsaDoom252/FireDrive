import React from 'react';
import {Navigate} from 'react-router-dom'
import {rootRoute,} from "../../common/commonData";
import SignIn from "./SignIn";

const SignInContainer = ({isAuth}) => {
    if (isAuth) {
       return  <Navigate to={rootRoute}/>
    }

    return <SignIn/>
};

export default SignInContainer;