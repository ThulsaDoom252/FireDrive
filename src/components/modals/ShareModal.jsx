import React, {useContext, useRef} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {noModal, stopPropagation} from "../../common/common";
import {SiFacebook, SiTelegram, SiViber} from "react-icons/si";
import Button from '@mui/material/Button';
import AnimatedContainer from '../../common/AnimatedContainer';
import {Box} from '@mui/material';
import {facebookShareBtn, tgShareBtn, viberShareBtn} from '../common/ItemOptions/btnTypes';

const ShareModal = ({handleModal}) => {
    const itemsModal = useContext(ItemsModalContext)
    const facebookBtnRef = useRef(null)
    const tgBtnRef = useRef(null)
    const vbBtnRef = useRef(null)

    const handleShare = (type) => {
        type === facebookShareBtn ? facebookBtnRef.current.click() :
            type === tgBtnRef ? tgBtnRef.current.click() :
                vbBtnRef.current.click()

    }

    const closeModal = () => handleModal({modalType: noModal})

    const {currentModalItemUrl} = itemsModal
    return (
        <React.Fragment>
            <TelegramShareButton url={currentModalItemUrl} ref={tgBtnRef} hidden/>
            <ViberShareButton url={currentModalItemUrl} ref={vbBtnRef} hidden/>
            <FacebookShareButton url={currentModalItemUrl} ref={facebookBtnRef} hidden/>
            <AnimatedContainer
                onCLick={closeModal}
                zIndex='z-20'>
                <Box
                    width='100%'
                    height='100%'
                    className='
           absolute
           flex
           justify-center
           items-center
           '>
                    <div onClick={stopPropagation} className='
            flex
            justify-between
            p-2
            items-center
            bg-white
            rounded-md
            w-60
            '>
                        <Button title={'share via telegram'} onClick={() => handleShare(tgShareBtn)}>
                            <SiTelegram size={30}/>
                        </Button>
                        <Button onClick={() => handleShare(facebookShareBtn)}>
                            <SiFacebook size={30}/>
                        </Button>
                        <Button title={'share via viber'} onClick={() => handleShare(viberShareBtn)}>
                            <SiViber size={30}/>
                        </Button>
                    </div>
                </Box>
            </AnimatedContainer>
        </React.Fragment>


    );
};

export default ShareModal;