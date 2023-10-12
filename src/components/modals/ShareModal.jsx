import React, {useContext} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {shareModal, stopPropagation} from "../../common/commonData";
import {SiFacebook, SiTelegram, SiViber} from "react-icons/si";
import {Fade} from "@mui/material";
import Button from '@mui/material/Button';


const ShareModal = ({animateModal, toggleModal}) => {
    const itemsModal = useContext(ItemsModalContext)

    const {currentModalItemUrl} = itemsModal
    return (
        <Fade in={animateModal} timeout={200}>
            <div className='
           w-screen
           h-screen
           absolute
           z-3
           bg-gray-800
           bg-opacity-80
           flex
           justify-center
           items-center
           ' onClick={() => toggleModal({modalType: shareModal})}>
                <div onClick={stopPropagation} className='
            flex
            justify-between
            p-2
            items-center
            bg-white
            rounded-md
            w-60
            '>
                    <Button title={'share via telegram'}>
                        <TelegramShareButton url={currentModalItemUrl} title={''}><SiTelegram
                            size={30}/></TelegramShareButton>
                    </Button>
                    <Button>
                        <FacebookShareButton url={currentModalItemUrl} title={''}>
                            <SiFacebook size={30}/>
                        </FacebookShareButton>
                    </Button>
                    <Button title={'share via viber'}>
                        <ViberShareButton url={currentModalItemUrl} title={''}>
                            <SiViber size={30}/>
                        </ViberShareButton>
                    </Button>
                </div>
            </div>
        </Fade>
    );
};

export default ShareModal;