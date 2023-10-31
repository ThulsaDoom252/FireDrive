import React from 'react';
import {animated, useSpring} from "react-spring"

const AnimationContainer = ({duration = 1000, children}) => {
    const animationStyle = useSpring({
        opacity: 1,
        from: {opacity: 0},
        config: {duration}
    });

    return (
        <animated.div style={animationStyle}>{children}</animated.div>
    );
};

export default AnimationContainer;