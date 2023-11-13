import {useContext} from "react";
import {slide as Menu} from 'react-burger-menu'
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {mainContentId, wrapperId} from "../../common/common";
import {Box} from '@mui/material';

const BurgerMenuWrapper = ({
                               smallScreen,
                               adaptForASmallScreen = true,
                               pageWrapId = wrapperId, contentId = mainContentId,
                               children,
                               onClick,
                           }) => {
    const ctx = useContext(BurgerMenuContext)
    const {menuOpenState, toggleMenu} = ctx

    return (
        <Menu
            right
            pageWrapId={pageWrapId}
            outerContainerId={contentId}
            onClose={() => toggleMenu(false)}
            customBurgerIcon={false}
            width={adaptForASmallScreen && smallScreen ? '35%' : void 0}
            isOpen={menuOpenState}
        >
            <Box className={'w-full flex flex-col justify-center p-2'}>
                {children}
            </Box>
        </Menu>
    )
}


export default BurgerMenuWrapper
