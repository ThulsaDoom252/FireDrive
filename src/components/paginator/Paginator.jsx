import React from 'react';
import {Pagination} from '@mui/material';
import ThemeContainer from '../common/theme/ThemeContainer';

const Paginator = ({paginatorProps}) => {
    const [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick,
        currentPage, totalPages] = paginatorProps

    const handleChange = (e, value) => handlePageClick(value)

    return (

        <ThemeContainer>
            <Pagination
                // eslint-disable-next-line react/prop-types
                count={totalPages}
                page={currentPage}
                onChange={handleChange}
                nexticonbuttonprops={{
                    onClick: handleNextClick,
                    disabled: disableNextButton,
                }}
                previconbuttonprops={{
                    onClick: handlePrevClick,
                    disabled: disablePrevButton,
                }}
                showFirstButton
                showLastButton
            />
        </ThemeContainer>


    );
};

export default Paginator;

