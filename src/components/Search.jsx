import React from 'react';
import {FaSearch} from "react-icons/fa";

const Search = () => {
    return (
        <div className={'w-full  h-full flex items-center'}>
            <div className={'bg-blue-300 w-10 h-full flex items-center justify-center rounded-l'}>
                <FaSearch/>
            </div>
            <input autoFocus={false} disabled={false} type="text"
                   className={'w-full h-full pl-5 rounded-r focus:outline-none focus:ring-1 focus:ring-blue-300 '}
                   placeholder={'Search media...'}/>
        </div>
    );
};

export default Search;