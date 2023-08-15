import React from 'react';
import {connect} from "react-redux";
import {deleteCurrentItem, handleMediaName} from "../../redux/mediaSlice";
import {BsDownload, BsPencilFill, BsTrash} from "react-icons/bs";
import {TelegramShareButton, ViberShareButton} from "react-share";
import {FaTelegram, FaViber} from "react-icons/fa";


const MediaOptions = ({
                          handleMediaName,
                          deleteCurrentItem,
                          name,
                          tgIconColor = 'rgb(77, 171, 247)',
                          vbIconColor = 'rgb(193, 122, 250)',
                          iconsSize = 20,
                          url, index, searchMode, currentRoute
                      }) => {

    return (
        <div className={'hover:cursor-pointer p-1 h-fit bg-settingsBar flex justify-center items-center rounded'}>
            <TelegramShareButton url={url} title={''}><FaTelegram className={'mx-2'}
                                                                  title={"share via telegram"}
                                                                  size={iconsSize}
                                                                  color={tgIconColor}/></TelegramShareButton>
            <ViberShareButton url={url}><FaViber
                title={"share via viber"}
                className={'mx-2'} size={iconsSize}
                color={vbIconColor}/></ViberShareButton>
            <BsPencilFill size={iconsSize} className={'mx-2'}
                          title={"edit current item name"}
                          color={'blue'} onClick={() => handleMediaName({name})}/>
            <BsTrash title={'delete current item'} size={iconsSize} className={'mx-2'} color={'red'}
                     onClick={() => deleteCurrentItem({url, index, searchMode, route: currentRoute})}/>
            {/*<BsDownload className="text-gray-200" size={iconsSize}/>*/}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        currentRoute: state.media.currentRoute

    }
}


export default connect(mapStateToProps, {handleMediaName, deleteCurrentItem})(MediaOptions);