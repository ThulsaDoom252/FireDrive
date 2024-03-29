import React, {useState, createContext} from 'react'
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


