import {useContext} from "react";
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {CiMenuBurger} from "react-icons/ci";
import FittedThemeBtn from "../../common/theme/FittedThemeBtn";

const BurgerMenuTrigger = ({classname = 'bm-burger-button'}) => {
    const ctx = useContext(BurgerMenuContext)
    const {toggleMenu} = ctx

    return (
        <FittedThemeBtn className={classname} onClick={toggleMenu}><CiMenuBurger size={30}/>
        </FittedThemeBtn>
    )
};

export default BurgerMenuTrigger