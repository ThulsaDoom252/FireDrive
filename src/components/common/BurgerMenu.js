import {useContext} from "react";
import {slide as Menu} from 'react-burger-menu'
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {mainContentId, wrapperId} from "../../common/commonData";


const BurgerMenu = ({
                        items = [],
                        pageWrapId = wrapperId, contentId = mainContentId
                    }) => {
    const ctx = useContext(BurgerMenuContext)
    const {menuOpenState} = ctx

    return (
        <Menu
            right
            pageWrapId={pageWrapId}
            outerContainerId={contentId}
            customBurgerIcon={false}
            width = {'35%'}
            isOpen={menuOpenState}
        >{items.length > 0 ? items.map((item, index) => <div>{item}</div>) : <div>No items</div>}
        </Menu>
    )
}


export default BurgerMenu