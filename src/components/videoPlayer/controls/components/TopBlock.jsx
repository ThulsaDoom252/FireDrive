import React from 'react';
import {HiDotsVertical} from "react-icons/hi";
import {stopPropagation} from "../../../../common/commonData";
import MediaOptions from "../../../options/ItemOptions";
import {useDispatch} from "react-redux";
import {toggleVideoMobileMenu} from "../../../../redux/appSlice";

const TopBlock = ({
                      topBtnClass,
                      handleShareMenu,
                      handleCurrentItemMenu,
                      smallScreenMode,
                      url,
                      name,
                      oldName,
                      index,
                  }) => {


    const dispatch = useDispatch()
    const handleOpenMobileMenu = () => {
        dispatch(toggleVideoMobileMenu(true))
    }

    return (
        <div className={`flex self-start justify-end h-5 w-full mt-1`}>
            {/*Top end btn block*/}
            <div className={`
                flex 
                justify-between
                ${!smallScreenMode ? 'mr-8 w-28' : 'mr-2'}      
                `}
                 onClick={stopPropagation}
            >
                {smallScreenMode ?
                    <div className={topBtnClass}
                         onClick={handleOpenMobileMenu}
                    >
                        <HiDotsVertical size={25}/>
                    </div> :
                    <div><MediaOptions initialMode={'show'}
                                       shouldAnimate={false}
                                       url={url}
                                       iconBgColor={'bg-gray-600'}
                                       iconBgActiveColor={'hover:bg-gray-100'}
                                       index={index}
                                       name={name}
                                       oldName={oldName}
                                       showBg={false}
                                       tgIconColor={'black'}
                                       vbIconColor={'black'}
                                       deleteIconColor={'black'}
                                       renameIconColor={'black'}

                    />
                    </div>}
            </div>
        </div>
    );
};

export default TopBlock;