import React, {useEffect, useState} from 'react';
import {animated, useSpring} from "react-spring"
import {delay} from './common';
import {defaultModalAnimateDuration} from '../config';

const AnimatedContainer = ({
                               duration = defaultModalAnimateDuration,
                               children,
                               onCLick,
                               zIndex = 'z-10',
                               showOverlay = true,
                               shouldClose,
                               overlayColor = 'bg-gray-900',
                               overlayOpacity = 'bg-opacity-80'
                           }) => {
    const [opacityValues, setOpacityValues] = useState({initial: 1, start: 0})

    const animationStyle = useSpring({
        opacity: opacityValues.initial,
        transition: `all ${duration}ms ease`,
        from: {opacity: opacityValues.start},
        config: {duration}
    });

    useEffect(() => {
        shouldClose && handleClick()
    }, [shouldClose]);

    const overlayStyle = `${overlayColor} ${overlayOpacity}`

    const handleClick = async () => {
        setOpacityValues({initial: 0, start: 1})
        await delay(duration)
        onCLick()
    }

    return (
        <animated.div style={animationStyle} onClick={handleClick}
                      className={`w-screen h-screen absolute  ${showOverlay && overlayStyle} ${zIndex}`}>
            {children}
        </animated.div>
    );
};

export default AnimatedContainer;