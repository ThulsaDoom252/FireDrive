import React from 'react';
import ActionBtn from "../../common/ActionBtn";
import {signInRoute} from "../../../common/commonData";
import {NavLink} from "react-router-dom";
import ActionInput from "../../common/ActionInput";

const Restore = ({
                     isRestoreEmailSend, restoreTimerValue, restoreEmail, restoreEmailTypeError,
                     handleSendEmail, handleInputChange
                 }) => {

    return (
        <div className={'container-sm flex items-center  flex-col h-screen mx-auto mt-20'}>
            {isRestoreEmailSend && <h3 className='
                mt-5
                '>Link to restore password has been send to {restoreEmail}</h3>}
            <p className='
            text-center
                text-lg
                mt-5
                '>
                Here you can reset your login credentials if you've
                forgotten them.
                Enter email that was used during registration, to receive password-reset link .</p>
            <p className={'mt-5'}>
                <ActionInput
                    onChange={handleInputChange}
                    value={restoreEmail}
                    type={'text'}
                    placeholder={'email'}
                />
            </p>
            {restoreEmailTypeError && <div className='mt-2 text-red-500'>Not look like an email!</div>}
            <div className={'mt-4 flex flex-col justify-center items-center'}>
                <div>{isRestoreEmailSend && `Dont get the link? Request another in: ${restoreTimerValue && restoreTimerValue}`}</div>
                <div>
                    <ActionBtn
                        isDisabled={isRestoreEmailSend}
                        handleClick={handleSendEmail}
                        btnStyle={'primary'}>Send verification link</ActionBtn>
                </div>
                <div className={'mt-5'}>
                    <ActionBtn btnStyle={'primary'}>
                        <NavLink to={signInRoute} className={'text-white no-underline'}>
                            Return to Login page
                        </NavLink>
                    </ActionBtn>
                </div>
            </div>

        </div>
    );
};

export default Restore;