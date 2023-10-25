import React from 'react';
import {TextField} from "@mui/material"
import {customInput} from "../mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {FaSearch} from "react-icons/fa";

const Search = ({
                    searchRequest,
                    setSearchRequest,
                    isDisabled,
                    toggleSearch,
                }) => {

    const handleBlur = () => {
        toggleSearch(false)
    }

    return (
        <div
            className={`bg-white  w-full`}>
            <TextField
                autoFocus={true}
                onBlur={handleBlur}
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
                }}
            />
        </div>
    );
};


export default Search;