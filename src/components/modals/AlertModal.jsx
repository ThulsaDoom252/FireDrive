import React from 'react';
import {CgCloseR} from "react-icons/cg";
import CurrentUser from "../user/CurrentUser";
import {GoAlert} from "react-icons/go";
import {IoClose} from "react-icons/io5";
import ActionBtn from "../common/ActionBtn";
import {connect} from "react-redux";
import {handleAlertAction} from "../../redux/appSlice";

const AlertModal = ({
                        iconSize = 25,
                        alertBtnStyle,
                        alertBtnLabel,
                        alertMessage,
                        alertTitle,
                        alertActionType,
                        handleAlertAction,
                        closeModal,
                        showAlertModal,
                    }) => {

    const handleClose = () => {
        closeModal(!showAlertModal)
        debugger
    }
    return (
        <div
            className='
            bg-white
            fixed
           top-1/2
        left-1/2
        p-3
            transform -translate-x-1/2 -translate-y-1/2
            rounded
            w-userModal
            flex
            flex-col
            items-center
            justify-center
            z-50
            transition'>
            <div className={' w-full flex justify-start items-center flex-col'}>
                <div className={'absolute right-2 top-2 hover:cursor-pointer transition'}
                     onClick={handleClose}
                ><IoClose/></div>
                <div className={'flex w-full justify-start'}>
                    <div className={'bg-red-300 rounded-5 w-14 h-10 flex justify-center items-center'}>
                        <GoAlert color={'red'} size={iconSize}/>
                    </div>
                    <div>
                        <h5 className={'ml-2'}>{alertTitle}</h5>
                        <div>{alertMessage}</div>
                        <div className='flex justify-end mt-2'>
                            {/*<div className='mr-3'>*/}
                            {/*    <ActionBtn btnStyle={alertBtnStyle} label={'Dismiss'}/>*/}
                            {/*</div>*/}
                            <div>
                                <ActionBtn btnStyle={alertBtnStyle}
                                           handleClick={() => handleAlertAction({actionType: alertActionType})}
                                           label={alertBtnLabel}/>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        alertMessage: state.app.alertMessage,
        alertTitle: state.app.alertTitle,
        alertStyle: state.app.alertStyle,
        alertBtnStyle: state.app.alertBtnStyle,
        alertBtnLabel: state.app.alertBtnLabel,
        alertActionType: state.app.alertActionType,

    }
}

export default connect(mapStateToProps, {handleAlertAction})(AlertModal);