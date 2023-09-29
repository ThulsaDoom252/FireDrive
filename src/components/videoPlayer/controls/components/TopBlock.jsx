import React from 'react';
import {HiDotsVertical} from "react-icons/hi";
import {stopPropagation} from "../../../../common/commonData";
import ItemOptions from "../../../options/ItemOptions";

const TopBlock = ({
                      topBtnClass,
                      smallScreenMode,
                      isMobileFullScreen,
                      toggleVideoMobileSettings,
                      url,
                      name,
                      oldName,
                      index,
    confirm,
                  }) => {

    return (
        <div className={`flex self-start justify-end h-5 w-full mt-1`}>
            {/*Top end btn block*/}
            <div className={`
                flex 
                justify-between
                ${!smallScreenMode && !isMobileFullScreen ? 'mr-8 mt-2 ' : 'mr-2'}      
                `}
                 onClick={stopPropagation}
            >
                {smallScreenMode || isMobileFullScreen ?
                    <div className={topBtnClass}
                         onClick={() => toggleVideoMobileSettings(true)}
                    >
                        <HiDotsVertical size={25}/>
                    </div> :
                    <div><ItemOptions initialMode={'show'}
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
                                       confirm={confirm}

                    />
                    </div>}
            </div>
        </div>
    );
};

export default TopBlock;