import React from 'react';
import {
    alertSuccessStyle,
    alertWarningStyle,
} from "../../common/commonData";
import {AiOutlineClose} from "react-icons/ai";

const Alert = ({
                   alertStyle,
                   handleAlert,
                   handleAlertAction,
                   alertContent = '',
                   showAlertOkButton = false,
               }) => {

    const handleBtn = () => handleAlertAction({alertContent})

    return (
        <div
            className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11/12 alert-sm:w-500 h-200 flex justify-center items-center rounded text-lg text-black text-center z-50 
             ${alertStyle === alertSuccessStyle ? 'bg-emerald-400 text-white' : alertStyle === alertWarningStyle ? 'bg-amber-200' : 'bg-red-700 text-white'} `}
        >
            <button onClick={() => handleAlert({overlayMode: true, toggle: false})}
                    className={'absolute top-0 right-0'}>
                <AiOutlineClose/>
            </button>
            {alertContent}
            {showAlertOkButton && <button onClick={handleBtn}
                                          className={'absolute bottom-5'}>
                Ok
            </button>}

        </div>
    )
};
export default Alert;




























