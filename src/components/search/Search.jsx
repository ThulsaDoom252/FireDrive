import React from 'react';
import {TextField} from "@mui/material"
import {customInput} from "../mui/styles";
import InputAdornment from "@mui/material/InputAdornment";
import {FaSearch} from "react-icons/fa";

const Search = ({height, searchRequest, isSearchFocused, setSearchRequest, isDisabled, setIsSearchFocused}) => {
    const handleFocus = () => {
        setIsSearchFocused(true)
    }

    const handleBlur = () => {
        setIsSearchFocused(false)
    }

    return (
        <div className={`transition-all duration-100 w-10 ${isSearchFocused && 'bg-white w-full'}`}>
            {/*<div className={'bg-blue-300 w-10 h-full flex items-center justify-center rounded-l'}>*/}
            {/*    <FaSearch/>*/}
            {/*</div>*/}
            {/*<input autoFocus={false} disabled={isDisabled} type="text"*/}
            {/*       value={searchRequest}*/}
            {/*       onChange={(e) => setSearchRequest(e.currentTarget.value)}*/}
            {/*       className={'w-full h-full pl-5 rounded-r focus:outline-none focus:ring-1 focus:ring-blue-300 '}*/}
            {/*       placeholder={'search media...'}/>*/}
            <TextField
                onClick={handleFocus}
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