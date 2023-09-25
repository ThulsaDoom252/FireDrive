import React from 'react';
import {signInRoute} from "../../../common/commonData";
import {NavLink} from "react-router-dom";
import {Button, TextField} from "@mui/material";
import {useSelector} from "react-redux";

const Restore = ({
                     isRestoreEmailSend, restoreTimerValue, restoreEmail, restoreEmailTypeError,
                     handleSendEmail, handleInputChange
                 }) => {


    const username = useSelector(state => state.auth.username)

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
                <TextField id="outlined-basic" label="Email" variant="outlined" onChange={handleInputChange}
                           value={restoreEmail} type={'text'}/>
                {/*<ActionInput*/}
                {/*    onChange={handleInputChange}*/}
                {/*    value={restoreEmail}*/}
                {/*    type={'text'}*/}
                {/*    placeholder={'email'}*/}
                {/*/>*/}
            </p>
            {restoreEmailTypeError && <div className='mt-2 text-red-500'>Not look like an email!</div>}
            <div className={'mt-4 flex flex-col justify-center items-center'}>
                <div>{(isRestoreEmailSend && restoreTimerValue !== null) && `Dont get the link? Request another in: ${restoreTimerValue && restoreTimerValue}`}</div>
                <div>
                    <Button
                        disabled={isRestoreEmailSend}
                        color={'primary'}
                        variant={'contained'}
                        onClick={handleSendEmail}
                    >Send restore link</Button>
                </div>
                <div className={'mt-5'}>
                    <Button color={'primary'} variant={'contained'}>
                        <NavLink to={signInRoute} className={'text-white no-underline'}>
                            Return to Login page
                        </NavLink>
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Restore;