import React, {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import {BiColorFill} from 'react-icons/bi';
import {themes} from '../../common/theme/themes';
import ThemeImage from '../../ThemeImage';
import {handleTheme} from '../../../redux/appSlice';
import {useDispatch} from 'react-redux';
import {burgerMenuIconSize} from '../../../common/common';

const ThemeDropDown = ({currentThemeName, iconSize = burgerMenuIconSize}) => {
    const dispatch = useDispatch()
    const [isThemeBlockOpened, setIsThemeBlockOpened] = useState(false)
    return (
        <DropDownMenu menuType={isThemeBlockOpened} toggleMenu={setIsThemeBlockOpened}
                      btnLabel={'Change theme'} smallScreenIcon={<BiColorFill size={iconSize}/>}>
            {themes.map((theme, index) =>
                <React.Fragment key={index}>
                    <ThemeImage
                        currentThemeName={currentThemeName}
                        theme={theme.type}
                        url={theme.icon}
                        onClick={() => dispatch(handleTheme(theme.type))}

                    />
                </React.Fragment>
            )}
        </DropDownMenu>
    );
};

export default ThemeDropDown;