import React from 'react';
import noResults from "./noResults.png"

const NoSearchResults = () => {
    return (
        <div
            className={`flex text-xl flex-col items-center justify-center`}>
            <img className={'w-1/3'} src={noResults} alt={'no-results-img'}/>
            <div>Nothing found...</div>
        </div>
    );
}

export default NoSearchResults;