import React, {useContext} from 'react';
import MyCustomTransition from "../common/MyCustomTransition";
import ModalContainer from "./ModalContainer";
import MyModal from "../common/MyModal";
import Overlay from "../common/Overlay";
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {noModal, stopPropagation} from "../../common/commonData";
import {SiFacebook, SiTelegram, SiViber} from "react-icons/si";

const ShareModal = ({showModal, toggleModal}) => {

    const itemsModal = useContext(ItemsModalContext)

    const {currentModalItemUrl} = itemsModal
    return (
        <MyCustomTransition show={showModal}>
            <ModalContainer handleClose={() => toggleModal(noModal)} zIndex={'z-2'}>
                <Overlay/>
                <MyModal flex={true} width={'w-auto'}>
                    <div onClick={stopPropagation} className={'w-200 flex justify-between p-2 items-center '}>
                        <div title={'share via telegram'}>
                            <TelegramShareButton url={currentModalItemUrl} title={''}><SiTelegram
                                size={30}/></TelegramShareButton>
                        </div>
                        <div>
                            <FacebookShareButton url={currentModalItemUrl} title={''}>
                                <SiFacebook size={30}/>
                            </FacebookShareButton>
                        </div>
                        <div title={'share via viber'}>
                            <ViberShareButton url={currentModalItemUrl} title={''}>
                                <SiViber size={30}/>
                            </ViberShareButton>
                        </div>

                    </div>
                </MyModal>
            </ModalContainer>
        </MyCustomTransition>
    );
};

export default ShareModal;