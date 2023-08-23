import React, {useState} from 'react';
import ActionBtn from "./ActionBtn";
import {BiDownArrow, BiUpArrow} from "react-icons/bi";
import {useSelector} from "react-redux";
import {Transition} from "react-transition-group";


const DropDownBtn = ({
                         switchToSmallScreenIcon = true,
                         smallScreenIcon,
                         isFullWidth = true,
                         animated = true,
                         duration = 300,
                         btnLabel = '',
                         children,
                         isDisabled,
                     }) => {
    const [isDropDownOpen, setIsDropDownOpen] = useState(false)
    const [isAnimationExited, setIsAnimationExited] = useState(true)
    const smallScreen = useSelector(state => state.app.smallScreen)

    const handleExitAnimation = () => {
        setTimeout(() => {
            setIsAnimationExited(true)
        }, [duration])
    }

    const handleOpenDropDown = e => {
        e.stopPropagation()
        setIsDropDownOpen(!isDropDownOpen)
    }

    const defaultStyle = {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
    }

    const transitionStyles = {
        entering: {opacity: 1},
        entered: {opacity: 1},
        exiting: {opacity: 0},
        exited: {opacity: 0},
    };

    return (
        <div className={`
        flex
        flex-col
        justify-center
        items-center      
        ${isFullWidth && 'w-full'}`}>
            <ActionBtn
                handleClick={handleOpenDropDown}
                isDisabled={isDisabled} isFullWidth={true}>
                {switchToSmallScreenIcon ? smallScreen ? smallScreenIcon : btnLabel : btnLabel}
                {!isDropDownOpen ?
                    <BiDownArrow className='
                absolute
                right-2
'/>
                    :
                    <BiUpArrow className='
                    absolute
                    right-2
                    '/>}</ActionBtn>
            <div className={'w-full'}>
                <Transition in={isDropDownOpen} timeout={duration} onEntering={() => setIsAnimationExited(false)}
                            onExit={handleExitAnimation}>
                    {state => (
                        <div hidden={!animated ? !isDropDownOpen : false}
                             style={{...defaultStyle, ...transitionStyles[state]}}
                             className={`
                             w-full 
                             flex 
                             items-center 
                             ${!isDropDownOpen && isAnimationExited ? 'absolute' : 'block'} 
                             ${smallScreen && 'flex-col'}
                             `}>
                            {children}
                        </div>
                    )}
                </Transition>
            </div>
        </div>
    );
};

export default DropDownBtn;