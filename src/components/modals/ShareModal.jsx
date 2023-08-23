import React, {useContext} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {stopPropagation} from "../../common/commonData";
import {SiFacebook, SiTelegram, SiViber} from "react-icons/si";
import TransitionCommonParrent from "../common/TransitionCommonParrent";

const ShareModal = ({showModal, toggleModal}) => {

    const itemsModal = useContext(ItemsModalContext)

    const {currentModalItemUrl} = itemsModal
    return (
        <TransitionCommonParrent show={showModal} toggleModal={toggleModal} zIndex={'z-3'}>
            <div onClick={stopPropagation} className={'w-full flex justify-between p-2 items-center '}>
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
        </TransitionCommonParrent>


    );
};

export default ShareModal;