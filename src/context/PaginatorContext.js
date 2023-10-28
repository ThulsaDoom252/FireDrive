import React, {useEffect, useState, createContext} from 'react';
import {useSelector} from "react-redux";

export const PaginatorContext = createContext();

const PaginatorContextProvider = ({children}) => {
    const currentMediaSet = useSelector(state => state.media.currentMediaSet)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(100)
    const [firstItemIndex, setFirstItemIndex] = useState(0)
    const [lastItemIndex, setLastItemIndex] = useState(6)
    const [isPaginatorEnabled, setIsPaginatorEnabled] = useState(true)

    const [portionSize] = useState(4);
    const [portionNumber, setPortionNumber] = useState(1);

    useEffect(() => {
        if (currentMediaSet.length > 0) {
            setTotalPages(Math.ceil(currentMediaSet.length / itemsPerPage))
            setLastItemIndex(itemsPerPage)
        }
    }, [currentMediaSet, itemsPerPage])

    useEffect(() => {
        const newFirstMediaIndex = (currentPage !== 0 ? currentPage - 1 : currentPage) * itemsPerPage;
        const newLastItemIndex = Math.min(currentPage * itemsPerPage, currentMediaSet.length);
        setFirstItemIndex(newFirstMediaIndex)
        setLastItemIndex(newLastItemIndex)
    }, [currentMediaSet, itemsPerPage, currentPage]);

    const handlePrevClick = () => {
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % portionSize === 0) {
            setPortionNumber(portionNumber - 1);
        }
    };

    const handleNextClick = () => {
        setCurrentPage(currentPage + 1);
        if (currentPage % portionSize === 0) {
            setPortionNumber(portionNumber + 1);
        }
    };

    const handlePageClick = (page) => {
        setCurrentPage(page);
    };

    const disablePrevButton = currentPage === 1;
    const disableNextButton = currentPage === totalPages;

    const paginationValues = {
        handleNextClick,
        handlePrevClick,
        disablePrevButton,
        disableNextButton,
        handlePageClick,
        firstItemIndex,
        lastItemIndex,
        setTotalPages,
        setLastItemIndex,
        currentPage,
        itemsPerPage,
        setItemsPerPage,
        totalPages,
        isPaginatorEnabled,
        setIsPaginatorEnabled,
    }

    return (
        <>
            <PaginatorContext.Provider value={paginationValues}>{children}</PaginatorContext.Provider>;
        </>

    );
};

export default PaginatorContextProvider;