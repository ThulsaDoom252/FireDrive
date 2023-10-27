import React, {useState, createContext, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {toggleSearch} from "../redux/mediaSlice";

export const BurgerMenuContext = createContext();

export function BurgerMenuContextProvider({children}) {
    const [menuOpenState, setMenuOpenState] = useState(false)


    const stateChangeHandler = (newState) => setMenuOpenState(newState.isOpen)
    const toggleMenu = () => setMenuOpenState(!menuOpenState)

    const menuValues = {
        menuOpenState,
        stateChangeHandler,
        toggleMenu,
    }

    return (
        <BurgerMenuContext.Provider value={menuValues}>
            {children}
        </BurgerMenuContext.Provider>
    )
}


