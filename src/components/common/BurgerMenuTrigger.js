import {useContext} from "react";
import {BurgerMenuContext} from "../../context/BurgerMenuContext";
import {CiMenuBurger} from "react-icons/ci";

const BurgerMenuTrigger = ({classname = 'bm-burger-button'}) => {
    const ctx = useContext(BurgerMenuContext)
    const {toggleMenu} = ctx

    return (
        <button className={classname} onClick={toggleMenu}><CiMenuBurger/></button>
    )
};

export default BurgerMenuTrigger