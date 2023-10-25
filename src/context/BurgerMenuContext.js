import React, {useState, createContext, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {toggleSearch} from "../redux/mediaSlice";

export const BurgerMenuContext = createContext();

export function BurgerMenuContextProvider(props) {
    const dispatch = useDispatch()
    const showMobileSearch = useSelector(state => state.media.showMobileSearch)
    const [menuOpenState, setMenuOpenState] = useState(false)

    useEffect(() => {
        if (menuOpenState) {
            showMobileSearch && dispatch(toggleSearch(false))
        }

    }, [menuOpenState])


    const stateChangeHandler = (newState) => setMenuOpenState(newState.isOpen)
    const toggleMenu = () => setMenuOpenState(!menuOpenState)

    const menuValues = {
        menuOpenState,
        stateChangeHandler,
        toggleMenu,
    }

    return (
        <BurgerMenuContext.Provider value={menuValues}>
            {props.children}
        </BurgerMenuContext.Provider>
    )
}


