import React, {useState} from 'react';
import DropDownMenu from './DropDownMenu';
import {BiColorFill} from 'react-icons/bi';
import {themes} from '../../common/theme/themes';
import ThemeImage from '../../ThemeImage';
import {handleTheme} from '../../../redux/appSlice';
import {useDispatch} from 'react-redux';

const ThemeDropDown = ({currentThemeName}) => {
    const dispatch = useDispatch()
    const [isThemeBlockOpened, setIsThemeBlockOpened] = useState(false)
    return (
        <DropDownMenu menuType={isThemeBlockOpened} toggleMenu={setIsThemeBlockOpened}
                      btnLabel={'Change theme'} smallScreenIcon={<BiColorFill/>}>
            {themes.map((theme, index) => <ThemeImage
                currentThemeName={currentThemeName}
                theme={theme.type}
                url={theme.icon}
                onClick={() => dispatch(handleTheme(theme.type))}

            />)}
        </DropDownMenu>
    );
};

export default ThemeDropDown;