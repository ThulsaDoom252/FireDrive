import React from 'react';
import {FiShare2} from "react-icons/fi";
import {HiDotsVertical} from "react-icons/hi";
import {stopPropagation} from "../../../../common/commonData";

const TopBlock = ({topBtnClass, handleShareMenu, handleCurrentItemMenu}) => {
    return (
        <div className={`flex self-start justify-end h-5 w-full mt-1`}>
            {/*Top end btn block*/}
            <div className={`
                mr-3
                flex 
                w-28
                justify-between      
                `}
                 onClick={stopPropagation}
            >
                {/*{Share btn}*/}
                <div className={topBtnClass}
                     onClick={handleShareMenu}
                >
                    <FiShare2 size={25}/>
                </div>
                {/*{Item options btn}*/}
                <div className={topBtnClass}
                     onClick={handleCurrentItemMenu}
                >
                    <HiDotsVertical size={25}/>
                </div>

            </div>
        </div>
    );
};

export default TopBlock;