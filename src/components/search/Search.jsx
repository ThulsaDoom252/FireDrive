import React from 'react';
import {IconButton, TextField} from "@mui/material"
import {customInput} from "../mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {FaSearch} from "react-icons/fa";
import {MdClear} from 'react-icons/md';
import ThemeBtn from '../common/theme/ThemeBtn';

const Search = ({
                    searchRequest,
                    setSearchRequest,
                    isDisabled,
    hideSearch,
                }) => {

    return (
        <div
            className={`bg-white  w-full`}>
            <TextField
                autoFocus={true}
                disabled={isDisabled}
                type={'text'}
                className={'w-full'}
                placeholder={'search media'}
                variant="outlined"
                value={searchRequest}
                sx={customInput.searchField}
                onChange={e => setSearchRequest(e.currentTarget.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <FaSearch/>
                        </InputAdornment>

                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <ThemeBtn size='small' onClick={() => setSearchRequest('')}>Clear</ThemeBtn>
                            <IconButton onClick={hideSearch}>
                                <MdClear/>
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </div>
    );
};


export default Search;