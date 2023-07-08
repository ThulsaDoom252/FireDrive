import React from 'react';
import {FaSearch} from "react-icons/fa";

const Search = () => {
    return (
        <div className={'w-full h-40 flex items-center'}>
            <div className={'bg-blue-300 w-10 h-full flex items-center justify-center'}>
                <FaSearch/>
            </div>
            <input autoFocus={false} disabled={false} type="text"
                   className={'w-full h-full pl-5'}
                   placeholder={'Search media...'}/>
            <button type="button" className={"btn btn-primary"}>Search</button>
        </div>
    );
};

export default Search;