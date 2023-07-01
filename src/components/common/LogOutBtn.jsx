import React from 'react';
import {connect, useDispatch} from "react-redux";
import {rootRoute} from "../../common/commonData";
import {handleLogout} from "../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";

const LogOutBtn = ({currentRoute, smallScreen}) => {

    return (
        <>
            <div hidden={!smallScreen && currentRoute !== rootRoute}>
                <button onClick={handleLogout}
                        className={'bg-purple-500  hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed'}>{
                    smallScreen ? <BiLogOut/> : 'Logout'
                }
                </button>
            </div>
        </>

    );
};


const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute,
        smallScreen: state.app.smallScreen,
    }
}

export default connect(mapStateToProps, {})(LogOutBtn);