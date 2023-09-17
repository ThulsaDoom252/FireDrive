import {useState, useContext} from "react";
import {connect} from "react-redux";
import {setLastPlayedAudioNameBeforeSort, sortCurrentMediaSet, toggleSortByValue} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {delay, getLocalStorageItem} from "../../common/commonData";
import Select from "react-select/base";

const SortInput = ({
                       options,
                       classname = 'select',
                       currentOption,
                       handleOptionChange,
                       disabled,
                       setSortedAudioName,
                       hidden,
                       handleArray,
                       direction = 'bottom'
                   }) => {

    const sortContext = useContext(PagesContext)

    const {
        rootPage,
        audioPage,
    } = sortContext

    const isDisabled = rootPage || disabled

    const handleChange = async (item) => {
        await handleOptionChange(item.value)
        audioPage && await setSortedAudioName(getLocalStorageItem('currentTrackName'))
        await handleArray({sortType: currentOption, isAudio: audioPage})
        await delay(100)
        audioPage && setSortedAudioName(null)
    };

    const handleInputChange = () => {
        return void 0
    };

    const [isMenuOpen, setMenuOpen] = useState(false);

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

const mapStateToProps = (state) => {
    return {
        currentOption: state.media.sortBy,
        options: state.media.sortOptions,
    }
}

export default connect(mapStateToProps, {
    handleOptionChange: toggleSortByValue,
    handleArray: sortCurrentMediaSet,
    setSortedAudioName: setLastPlayedAudioNameBeforeSort,
})(SortInput)
