import {useContext} from "react";
import {slide as Menu} from 'react-burger-menu'
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {mainContentId, wrapperId} from "../../common/commonData";

const BurgerMenu = ({
                        smallScreen,
                        adaptForASmallScreen = true,
                        pageWrapId = wrapperId, contentId = mainContentId,
                        children,
                        onClick,
                    }) => {
    const ctx = useContext(BurgerMenuContext)
    const {menuOpenState} = ctx

    return (
        <Menu
            right
            pageWrapId={pageWrapId}
            outerContainerId={contentId}
            customBurgerIcon={false}
            width={adaptForASmallScreen && smallScreen ? '35%' : void 0}
            isOpen={menuOpenState}
        >
            <div className={'w-full flex flex-col justify-center pb-40'}>
                {children}
            </div>
        </Menu>
    )
}


export default BurgerMenu
