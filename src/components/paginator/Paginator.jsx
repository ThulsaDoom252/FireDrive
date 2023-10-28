import React from 'react';
import {Pagination} from '@mui/material';

const Paginator = ({paginatorProps}) => {
    const [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick,
        currentPage, totalPages] = paginatorProps

    const handleChange = (e, value) => handlePageClick(value)

    return (
        <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handleChange}
            nextIconButtonProps={{
                onClick: handleNextClick,
                disabled: disableNextButton,
            }}
            prevIconButtonProps={{
                onClick: handlePrevClick,
                disabled: disablePrevButton,
            }}
            showFirstButton showLastButton
        />
    );
};

export default Paginator;

