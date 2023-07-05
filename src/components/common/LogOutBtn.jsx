import React from 'react';
import {connect} from "react-redux";
import {handleLogout} from "../../redux/authSlice";
import {BiLogOut} from "react-icons/bi";

const LogOutBtn = ({smallScreen, isFullWidth = true}) => {

    return (
        <>
            <div>
                <button onClick={handleLogout}
                        className={`${isFullWidth && 'w-full'} bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed`}>{
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