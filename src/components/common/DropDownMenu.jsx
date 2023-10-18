import React, {useState} from 'react';
import {BiDownArrow, BiUpArrow} from "react-icons/bi";
import {useSelector} from "react-redux";
import {Transition} from "react-transition-group";
import {defaultStyle, transitionStyles} from "../../common/TransitionStyles";
import ThemeBtn from "./theme/ThemeBtn";

const DropDownMenu = ({
                          switchToSmallScreenIcon = true,
                          smallScreenIcon,
                          isFullWidth = true,
                          animated = true,
                          duration = 300,
                          btnLabel = '',
                          children,
                          isDisabled,
                          menuType,
                          toggleMenu,
                      }) => {
    const [isAnimationExited, setIsAnimationExited] = useState(true)
    const smallScreen = useSelector(state => state.app.smallScreen)

    const handleExitAnimation = () => {
        setTimeout(() => {
            setIsAnimationExited(true)
        }, [duration])
    }

    const handleOpenDropDown = e => {
        e.stopPropagation()
        toggleMenu(!menuType)
    }

    return (
        <div className={`
        flex
        flex-col
        justify-center
        items-center      
        ${isFullWidth && 'w-full'}`}>
            <ThemeBtn
                onClick={handleOpenDropDown}
                disabled={isDisabled} fullWidth>
                {smallScreen ? smallScreenIcon : btnLabel}
                {!menuType ?
                    <BiDownArrow className='
                absolute
                right-2
'/>
                    :
                    <BiUpArrow className='
                    absolute
                    right-2
                    '/>}</ThemeBtn>
            <div className={'w-full'} hidden={!menuType}>
                <Transition in={menuType}
                            timeout={duration}
                            onEntering={() => setIsAnimationExited(false)}
                            onExit={handleExitAnimation}>
                    {state => (
                        <div hidden={!animated ? !menuType : false}
                             style={{...defaultStyle, ...transitionStyles[state]}}
                             className={`
                             w-full 
                             flex 
                             items-center 
                             ${!menuType && isAnimationExited ? 'absolute' : 'block'} 
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

export default DropDownMenu;