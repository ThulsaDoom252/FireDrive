import {useContext} from "react";
import {slide as Menu} from 'react-burger-menu'
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {mainContentId, wrapperId} from "../../common/commonData";
import {connect} from "react-redux";


const BurgerMenu = ({
                        items = [],
                        audioPlayer,
                        smallScreen,
                        sortInput,
                        adaptForASmallScreen = true,
                        pageWrapId = wrapperId, contentId = mainContentId,

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
            <div>{audioPlayer}</div>
            <div>
                {items.length > 0 ? items.map((item, index) =>
                    <div className={'mb-5'} key={index}>{item}</div>) : <div>No items</div>}
            </div>
            <div>{sortInput}</div>
        </Menu>
    )
}

const mapStateToProps = (state) => {
    return {
        smallScreen: state.app.smallScreen,
        horizontalMode: state.app.horizontalMode,
    }
}


export default connect(mapStateToProps, null)(BurgerMenu)