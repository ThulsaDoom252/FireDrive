import {makeStyles} from "@mui/styles";
import {Skeleton, styled} from '@mui/material';

export const useStyles = makeStyles((theme) => {
    return {
        gitIcon: {
            color: "green",
        },
        socialBtn: {
            margin: '2px',
            borderColor: "gray"
        },
        actionBtn: {
            backgroundColor: 'blue',
            color: 'white',
        },
        searchInput: {
            '&:focus': {
                background: 'white',
            },
            '& .MuiInputAdornment-root': {
                background: 'white',
            },
        },

        gridItemBtn: {
            width: '50px',
            display: 'flex',
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            height: '50px',
            borderRadius: '10px',
            "&:hover": {
                backgroundColor: 'white',
            },
        },
    };
});


export const customInput = {
    authField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Фон в состоянии focused (белый и полупрозрачный)
                "& fieldset": {
                    borderColor: 'blue',
                    borderWidth: '1px'
                },
            },
            "&:hover fieldset": {
                borderColor: "blue",
                transition: "all 0.3s ease-in-out",
            },
            "& fieldset": {
                borderColor: "black",
                borderWidth: "1px",
            },
        },
    },
    searchField: {
        '& input': {
            height: '10px'
        },
        '& input:focus': {
            borderRadius: '10px',
        }
    }
};

export const searchInput = {
    textField: {
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused": {
                backgroundColor: "rgba(255, 255, 255, 0.5)", // Фон в состоянии focused (белый и полупрозрачный)
                "& fieldset": {
                    borderColor: 'blue',
                    borderWidth: '1px'
                },
            },
            "&:hover fieldset": {
                borderColor: "blue", // Цвет бордера при наведении (красный)
                transition: "all 0.3s ease-in-out",
            },
            "& fieldset": {
                borderColor: "black", // Цвет бордера в обычном состоянии (черный)
                borderWidth: "1px", // Толщина бордера в обычном состоянии
            },
        },
    },
};


export const StyledImage = styled('img')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
});

export const GridItemContainer = styled('div')({
    width: '100%',
    maxHeight: '100%',
    paddingBottom: '100%', // Создаем пустое пространство для сохранения пропорций
    position: 'relative',
});

export const SkeletonOverlay = styled(Skeleton)({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
});

