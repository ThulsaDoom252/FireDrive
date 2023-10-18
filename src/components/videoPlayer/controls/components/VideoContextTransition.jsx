import React from 'react';
import {Transition} from "react-transition-group";

const VideoContextTransition = ({children, isVideoMenuOpen}) => {
    return (
        <Transition in={isVideoMenuOpen} timeout={200}>
            {(state) => <div
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
                                            ${state === 'entering' || state === 'exiting' ? 'opacity-0' : 'opacity-100'}
                                            ${state === 'exited' ? 'hidden' : ''}
                                            transition-opacity duration-200 ease-in-out
                                            `}>{children}
            </div>}
            </Transition>
    );
};

export default VideoContextTransition;