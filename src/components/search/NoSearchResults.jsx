import React from 'react';
import noResults from "./noResults.png"
import ThemeContainer from '../common/theme/ThemeContainer';

const NoSearchResults = () => {
    return (
        <div
            className={`flex text-xl flex-col items-center justify-center`}>
            <img className={'w-1/3'} src={noResults} alt={'no-results-img'}/>
            <ThemeContainer enableColor className='font-bold p-2 rounded-md mt-2'>Nothing found...</ThemeContainer>
        </div>
    );
}

export default NoSearchResults;