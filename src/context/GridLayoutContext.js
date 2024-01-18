import React, {createContext, useEffect, useState} from 'react';
import columnLayoutImg from '../components/media/layout/numbers/1.png';
import twoColumnsLayoutImg from '../components/media/layout/numbers/2.png';
import threeColumnsLayoutImg from '../components/media/layout/numbers/3.png';
import quadColumnsLayoutImg from '../components/media/layout/numbers/4.png';
import fiveColumnsLayoutImg from '../components/media/layout/numbers/5.png';
import sixColumnsLayoutImg from '../components/media/layout/numbers/6.png';
import {useSelector} from 'react-redux';

export const GridLayoutContext = createContext()

const GridLayoutContextProvider = ({children}) => {
    const [gridContainerWidth, setGridContainerWidth] = useState('100%')
    const [gridLayoutIndex, setGridLayoutIndex] = useState(5)
    const [gridDividerValue, setGridDividerValue] = useState(2)
    const smallScreen = useSelector(state => state.app.smallScreen)

    useEffect(() => {
        if (smallScreen) {
            gridContainerWidth !== '100%' && setGridContainerWidth('100%')
            return
        }

        if (!smallScreen) {
            switch (gridDividerValue) {
                case 3: {
                    setGridContainerWidth('80%')
                    gridContainerWidth !== '80%' && setGridContainerWidth('80%')
                    break;
                }
                case 4: {
                    setGridContainerWidth('70%')
                    gridContainerWidth !== '70%' && setGridContainerWidth('70%')
                    break
                }
                case 6: {
                    gridContainerWidth !== '60%' && setGridContainerWidth('60%')
                    break
                }
                case 12 : {
                    gridContainerWidth !== '30%' && setGridContainerWidth('30%')
                    break
                }
                default: {
                    gridContainerWidth !== '100%' && setGridContainerWidth('100%')
                }
            }
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gridDividerValue, smallScreen])

    const handleCollValue = (number, index) => {
        setGridLayoutIndex(index)
        setGridDividerValue(number)
    }


    const gridLayoutItemsArr = [
        {img: columnLayoutImg, divider: 12},
        {img: twoColumnsLayoutImg, divider: 6},
        {img: threeColumnsLayoutImg, divider: 4},
        {img: quadColumnsLayoutImg, divider: 3},
        {img: fiveColumnsLayoutImg, divider: 2.4},
        {img: sixColumnsLayoutImg, divider: 2},
    ]

    const gridLayoutState = {
        gridContainerWidth,
        gridLayoutIndex,
        gridDividerValue,
        gridLayoutItemsArr,
        handleCollValue,
    }

    return (
        <GridLayoutContext.Provider value={gridLayoutState}>
            {children}
        </GridLayoutContext.Provider>
    );
};

export default GridLayoutContextProvider;