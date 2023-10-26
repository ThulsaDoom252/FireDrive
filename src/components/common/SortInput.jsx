import {useState, useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentMediaSet, setLastPlayedAudioNameBeforeSort, toggleSortByValue} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {delay, getLocalStorageItem} from "../../common/common";
import Select from "react-select/base";

const SortInput = ({
                       classname = 'select',
                       disabled,
                       direction = 'bottom'
                   }) => {

    const pages = useContext(PagesContext)
    const dispatch = useDispatch()
    const [isMenuOpen, setMenuOpen] = useState(false);
    const currentOption = useSelector(state => state.media.sortBy)
    const options = useSelector(state => state.media.sortOptions)

    const {
        rootPage,
        audioPage,
    } = pages

    const isDisabled = rootPage || disabled

    const handleChange = async (item) => {
        await dispatch(toggleSortByValue(item.value))
        audioPage && await setLastPlayedAudioNameBeforeSort(getLocalStorageItem('currentTrackName'))
        await setCurrentMediaSet({sortType: currentOption, isAudio: audioPage})
        await delay(100)
        audioPage && await (setLastPlayedAudioNameBeforeSort(null))
    };

    const handleInputChange = () => {
        return void 0
    };
    const handleOpenMenu = () => setMenuOpen(true);
    const handleCloseMenu = () => setMenuOpen(false);

    return (
        <>
            <Select
                className={classname}
                onMenuClose={handleCloseMenu}
                isDisabled={isDisabled}
                onMenuOpen={handleOpenMenu}
                options={options}
                onChange={handleChange}
                menuPlacement={direction}
                placeholder={currentOption}
                onInputChange={handleInputChange}
                isSearchable={false}
                blurInputOnSelect={false}
                menuIsOpen={isMenuOpen}
            />
        </>
    );
}
export default SortInput

