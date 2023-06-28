import React from 'react';
import {connect} from "react-redux";
import {alertRemoveAll, alertSuccessStyle, alertWarningStyle, removeAllMsg} from "../common/commonData";
import {AiOutlineClose} from "react-icons/ai";
import {handleAlert, handleAlertAction} from "../redux/appSlice";

const Alert = ({alertStyle, alertMode, handleAlert, currentRoute, currentMediaSet, handleAlertAction}) => {
    return (
        <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-500 h-200 flex justify-center items-center rounded text-lg text-black text-center z-50 
             ${alertStyle === alertSuccessStyle ? 'bg-emerald-400 text-white' : alertStyle === alertWarningStyle ? 'bg-amber-200' : 'bg-red-700 text-white'} `}
        >
            <button onClick={() => handleAlert({overlayMode: true, toggle: false})}
                    className={'absolute top-0 right-0'}>
                <AiOutlineClose/>
            </button>
            {alertMode === alertRemoveAll && <div>{removeAllMsg}</div>}
            {alertMode === alertRemoveAll && (
                <button onClick={() => handleAlertAction({alertMode, currentRoute, currentMediaSet})}
                        className={'absolute bottom-5'}>
                    Ok
                </button>
            )}
        </div>
    );
};


const mapStateToProps = (state) => {
    return {
        alertMode: state.app.alertMode,
        alertStyle: state.app.alertStyle,
        currentMediaSet: state.media.currentMediaSet,
        currentRoute: state.media.currentRoute,
    }
}

export default connect(mapStateToProps, {handleAlert, handleAlertAction})(Alert);