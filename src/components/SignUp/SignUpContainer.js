import React from 'react';
import SignUp from "./SignUp";
import {rootRoute} from "../../common/commonData";
import {Navigate} from "react-router-dom"

const SignUpContainer = ({isAuth}) => {
    if (isAuth) {
        return <Navigate to={rootRoute}/>
    }

    return <SignUp/>
};

export default SignUpContainer;