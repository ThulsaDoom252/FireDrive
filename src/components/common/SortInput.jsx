import {useContext} from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    handleSortitems,
} from "../../redux/mediaSlice";
import {PagesContext} from "../../context/PagesContext";
import {byDate, byName, bySize} from "../../common/common";
import {FormControl, InputLabel, MenuItem, Select} from '@mui/material';
import {useStyles} from '../mui/styles';

const SortInput = ({
                       classname = 'select',
                       disabled,
                       direction = 'bottom'
                   }) => {

    const pages = useContext(PagesContext)
    const dispatch = useDispatch()
    const sortBy = useSelector(state => state.media.sortBy)
    const currentTheme = useSelector(state => state.app.currentTheme)

    const classes = useStyles(currentTheme)

    const {
        rootPage,
        audioPage,
    } = pages

    const isDisabled = rootPage || disabled

    const handleChange = (event) => {
        dispatch(handleSortitems({value: event.target.value, isAudio: audioPage}))
    };

    return (
        <>
            <FormControl className={classes.formControl} fullWidth disabled={isDisabled}>
                <InputLabel id="sort-form-label">Sort</InputLabel>
                <Select
                    disabled={isDisabled}
                    labelId="sort-form-label"
                    id="sort-form"
                    value={sortBy}
                    onChange={handleChange}
                >
                    <MenuItem value={byDate}>{byDate}</MenuItem>
                    <MenuItem value={byName}>{byName}</MenuItem>
                    <MenuItem value={bySize}>{bySize}</MenuItem>
                </Select>
            </FormControl>
        </>
    );
}
export default SortInput

