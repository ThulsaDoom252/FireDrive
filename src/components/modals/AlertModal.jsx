import React, {useContext} from 'react';
import {GoAlert} from "react-icons/go";
import {IoClose} from "react-icons/io5";
import ActionBtn from "../common/ActionBtn";
import {connect} from "react-redux";
import MyCustomTransition from "../common/MyCustomTransition";
import {
    audioRoute,
    imagesRoute, noModal,
    removeAllItems,
    removeCurrentItem,
    videosRoute
} from "../../common/commonData";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {PagesContext} from "../../context/PagesContext";
import MyModal from "../common/MyModal";
import ModalContainer from "./ModalContainer";

const AlertModal = ({
                        iconSize = 25,
                        alertBtnStyle,
                        alertBtnLabel,
                        alertMessage,
                        alertTitle,
                        alertActionType,
                        handleAlertAction,
                        toggleModal,
                        showAlertModal,

                    }) => {

    const handleClose = () => {
        toggleModal(noModal)
    }

    const modalContext = useContext(ItemsModalContext)
    const {
        currentModalItemUrl,
        currentModalItemIndex,
        searchMode,
    } = modalContext

    const pagesContext = useContext(PagesContext)
    const {
        imagesPage,
        videosPage,
    } = pagesContext


    const handleAction = () => {
        switch (alertActionType) {
            case removeCurrentItem:
                handleAlertAction({
                    actionType: alertActionType,
                    url: currentModalItemUrl,
                    index: currentModalItemIndex,
                    searchMode: searchMode,
                    route: videosPage ? videosRoute : imagesPage ? imagesRoute : audioRoute
                })
                break
            case removeAllItems:
                handleAlertAction({actionType: alertActionType})
                break
            default:
                void 0
        }
    }

    return (
        <MyCustomTransition show={showAlertModal}>
            <ModalContainer zIndex={'z-max'} handleClose={handleClose}>
                <MyModal>
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
                                                   handleClick={handleAction}
                                                   label={alertBtnLabel}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </MyModal>
            </ModalContainer>
        </MyCustomTransition>

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

export default connect(mapStateToProps, null)(AlertModal);