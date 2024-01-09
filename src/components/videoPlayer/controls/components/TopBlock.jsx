import React from 'react';
import ItemOptions from "../../../common/ItemOptions/ItemOptions";
import {Box, Button, Fade} from '@mui/material';
import {topVideoOptionsBtn, videoPlayerOptionsBlock} from '../../../../common/styles';
import {PiDotsThreeOutlineFill} from 'react-icons/pi';
import Overlay from '../../../common/Overlay';

const TopBlock = ({
                      optionBtnSize = 25,
                      url,
                      name,
                      oldName,
                      index,
                      confirm,
                      toggleModal,
                      videoOptions,
                      isVideoOptionsWidthExpanded,
                      handleVideoOptions,
                  }) => {
    const showOptions = (e) => {
        e.stopPropagation()
        handleVideoOptions()
    }

    return (
        <>
            <Box
                display='flex'
                flexDirection='column'
                alignItems='flex-end'
                alignSelf='end'
                width='100%'
                marginTop='5px'>
                {!videoOptions &&
                    <Button onClick={showOptions} sx={topVideoOptionsBtn}><PiDotsThreeOutlineFill
                        size={optionBtnSize}/></Button>}
            </Box>
            <Fade in={videoOptions}>
                <Box>
                    <Overlay bg={'bg-[#090808]'} toggleModal={handleVideoOptions} zIndex={'z-20'}/>
                    <Box width={isVideoOptionsWidthExpanded ? '80%' : '1%'} sx={videoPlayerOptionsBlock}>
                        <ItemOptions
                            fullWidth
                            iconsSize={isVideoOptionsWidthExpanded ? 50 : 10}
                            initialMode={'show'}
                            url={url}
                            tgIconColor={'#3f70e7'}
                            vbIconColor={'#9a65e0'}
                            deleteIconColor={'#ec4a4a'}
                            handleModal={toggleModal}
                            renameIconColor={'#595656'}
                            index={index}
                            name={name}
                            oldName={oldName}
                            confirm={confirm}/>
                    </Box>
                </Box>
            </Fade>


        </>
    );
};

export default TopBlock;

//
// {/*Top end btn block*/
// }
// {/*<div className={`*/
// }
// {/*    flex*/
// }
// {/*    justify-between*/
// }
// {/*    ${!smallScreenMode && !isMobileFullScreen ? 'mr-8 mt-2 ' : 'mr-2'}*/
// }
// {/*    `}*/
// }
// {/*     onClick={stopPropagation}*/
// }
// {/*>*/
// }
// {/*    <div><ItemOptions initialMode={'show'}*/
// }
// {/*                      shouldAnimate={false}*/
// }
// {/*                      url={url}*/
// }
// {/*                      iconBgColor={'bg-gray-600'}*/
// }
// {/*                      iconBgActiveColor={'hover:bg-gray-100'}*/
// }
// {/*                      index={index}*/
// }
// {/*                      name={name}*/
// }
// {/*                      oldName={oldName}*/
// }
// {/*                      showBg={false}*/
// }
// {/*                      tgIconColor={'blue'}*/
// }
// {/*                      vbIconColor={'violet'}*/
// }
// {/*                      deleteIconColor={'red'}*/
// }
// {/*                      renameIconColor={'yellow'}*/
// }
// {/*                      confirm={confirm}*/
// }
//
// {/*    />*/
// }
// {/*    </div>*/
// }
// {/*</div>*/
// }