import {useLocation, useNavigate, useParams} from "react-router";
import React from "react";

const withRouterHOC = (Component) => {
    function ComponentWithRouterProp(props) {
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();
        const pathname = location.pathname
        return (
            <Component
                {...props}
                router={{location, navigate, params}}
                pathname={pathname}
            />
        );
    }

    return ComponentWithRouterProp;
}

export default withRouterHOC