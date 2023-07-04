import {useState, useContext} from "react";
import Select from "react-select";
import {connect} from "react-redux";
import {sortCurrentMediaSet, toggleSortByValue} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";

const SortInput = ({
                       options,
                       classname = 'select',
                       currentOption,
                       handleOptionChange,
                       disabled,
                       hidden,
                       handleArray,
                   }) => {

    const sortContext = useContext(PagesContext)


    const {
        rootPage
    } = sortContext

    const isDisabled = disabled
    const isHidden = hidden ? hidden : rootPage

    const handleChange = async (item) => {
        await handleOptionChange(item.value)
        debugger
        handleArray({sortType: currentOption})
    };

    const handleInputChange = () => {
        return void 0
    };

    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleOpenMenu = () => setMenuOpen(true);

    const handleCloseMenu = () => setMenuOpen(false);

    return (
        <>
            {!isHidden && <Select
                className={classname}
                onMenuClose={handleCloseMenu}
                isDisabled={isDisabled}
                onMenuOpen={handleOpenMenu}
                options={options}
                onChange={handleChange}
                placeholder={currentOption}
                onInputChange={handleInputChange}
                isSearchable={false}
                blurInputOnSelect={false}
                menuIsOpen={isMenuOpen}
            />}

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
})(SortInput)

