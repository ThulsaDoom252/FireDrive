import React from 'react';
import {Fade} from '@mui/material';

const VideoContextTransition = ({children, isVideoMenuOpen}) => {
    return (
        <Fade in={isVideoMenuOpen} timeout={200}>
           <div
                className={`
                                            absolute 
                                            bottom-12 
                                            right-10 
                                            border-gray-500
                                            bg-gray-500
                                            rounded
                                            bg-opacity-70 
                                            border-1 
                                            flex 
                                            flex-col 
                                            justify-end 
                                            items-start 
                                            p-2
                                            transition-opacity duration-200 ease-in-out
                                            `}>{children}
            </div>
            </Fade>
    );
};

export default VideoContextTransition;