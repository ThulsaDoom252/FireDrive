import React from 'react';
import {BiMobile} from "react-icons/bi";
import {AiFillSetting, AiOutlineFullscreen, AiOutlineFullscreenExit} from "react-icons/ai";

const BottomButtons = ({
                           controlBtnAnimation,
                           handlePiP,
                           handleVideoMenu,
                           handleFullScreen,
                           isFullScreen,
                       }) => {
    return (
        <div className={'flex w-20 justify-between mr-2'}>
            <div className={controlBtnAnimation}><BiMobile onClick={handlePiP} size={20}/></div>
            <div className={controlBtnAnimation}><AiFillSetting onClick={handleVideoMenu} size={20}/>
            </div>
            <div className={controlBtnAnimation} onClick={handleFullScreen}>{isFullScreen ?
                <AiOutlineFullscreenExit size={20}/> :
                <AiOutlineFullscreen size={20}/>}</div>
        </div>
    );
};

export default BottomButtons;