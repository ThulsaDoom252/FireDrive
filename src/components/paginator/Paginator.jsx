import React from 'react';

const Paginator = ({paginatorProps}) => {
    const [handleNextClick, handlePrevClick, disablePrevButton, disableNextButton, handlePageClick, pages,
        currentPage] = paginatorProps
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link cursor-pointer disabled:text-gray-300 cursor-not-allowed "
                            aria-label="Previous"
                            disabled={disablePrevButton}
                            onClick={handlePrevClick}>
                        &laquo;
                    </button>
                </li>
                {pages.map((page, index) => (
                    <li key={index} className={`page-item `}
                        onClick={() => handlePageClick(page)}>
                        <a
                            style={{color: page === currentPage ? 'blue' : 'gray'}}
                            className={`page-link  hover:cursor-pointer`}>{page}</a>
                    </li>
                ))}
                <li className="page-item">
                    <button
                        className={`page-link  cursor-pointer disabled:text-gray-300 cursor-not-allowed}`}
                        aria-label="Next"
                        onClick={handleNextClick}
                        disabled={disableNextButton}>
                        &raquo;
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Paginator;

