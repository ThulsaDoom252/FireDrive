import React, {useContext} from 'react';
import {ItemsModalContext} from "../../context/ItemsModalContext";
import {FacebookShareButton, TelegramShareButton, ViberShareButton} from "react-share";
import {noModal, stopPropagation} from "../../common/common";
import {SiFacebook, SiTelegram, SiViber} from "react-icons/si";
import Button from '@mui/material/Button';
import AnimatedContainer from '../../common/AnimatedContainer';
import {Box} from '@mui/material';

const ShareModal = ({handleModal}) => {
    const itemsModal = useContext(ItemsModalContext)
    const closeModal = () => handleModal({modalType: noModal})

    const {currentModalItemUrl} = itemsModal
    return (
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
            </Box>
        </AnimatedContainer>

    );
};

export default ShareModal;