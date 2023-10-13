import React from 'react';
import {TextField} from "@mui/material"
import {customInput} from "../mui/styles";

const Search = ({height, searchRequest, setSearchRequest, isDisabled, setIsSearchFocused}) => {
    const handleFocus = () => {
        setIsSearchFocused(true)
    }

    const handleBlur = () => {
        setIsSearchFocused(false)
    }

    return (
        <div className={`w-full`}>
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
                onBlur={handleBlur}
                id="filled-basic"
                disabled={isDisabled}
                type={'text'}
                className={'w-full'}
                placeholder={'search media'}
                variant="outlined"
                value={searchRequest}
                sx={customInput.searchField}
                onChange={e => setSearchRequest(e.currentTarget.value)}
            />
        </div>
    );
};


export default Search;