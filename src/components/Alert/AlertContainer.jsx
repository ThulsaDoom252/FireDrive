import React from 'react';
import Alert from "./Alert";
import {handleAlert, handleAlertAction} from "../../redux/appSlice";
import {connect} from "react-redux";
import {removeAllMsg} from "../../common/commonData";

const AlertContainer = ({
                            alertStyle,
                            currentMediaSet,
                            currentRoute,
                            handleAlert,
                            handleAlertAction,
                            alertContent,
                        }) => {

    return <Alert showAlertOkButton={alertContent === removeAllMsg} {...{
        alertStyle,
        handleAlert,
        handleAlertAction,
        alertContent,
        currentMediaSet,
        currentRoute
    }}/>

};

const mapStateToProps = (state) => {
    return {
        alertContent: state.app.alertContent,
        showAlertOkButton: state.app.showAlertOkButton,
        alertMode: state.app.alertMode,
        alertStyle: state.app.alertStyle,
        currentMediaSet: state.media.currentMediaSet,
        currentRoute: state.media.currentRoute,
    }
}

export default connect(mapStateToProps, {handleAlert, handleAlertAction})(AlertContainer);