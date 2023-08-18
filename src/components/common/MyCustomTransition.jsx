import React from 'react';
import {Transition} from "@headlessui/react";

const MyCustomTransition = ({show, shouldAnimate = true, children, transitionType = 'opacity'}) => {
    if (transitionType === 'opacity') {
        return (
            <Transition
                as={'div'}
                show={show}
                enter="transition-opacity duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-200"
                leaveFrom="opacity-100"
                appear={shouldAnimate}
                leaveTo="opacity-0">
                {children}

            </Transition>
        );
    }

    if (transitionType === 'width') {
        return (
            <Transition
                as="div"
                show={show}
                enter="transition-width duration-1000 ease-in-out"
                enterFrom="w-0"
                enterTo="w-[100%]"
                leave="transition-width duration-1000 ease-in-out"
                leaveFrom="w-[100%]"
                leaveTo="w-0"
            >
                {children}
            </Transition>
        )
    }

};

export default MyCustomTransition;