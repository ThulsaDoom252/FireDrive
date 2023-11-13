import {makeStyles} from "@mui/styles";
import {Skeleton, styled} from '@mui/material';

export const useStyles = makeStyles(() => ({
    sortInput: (props) => ({
        '& .MuiOutlinedInput-root': {
            '&:hover fieldset, &.Mui-focused fieldset ': {
                borderColor: props.primeBg,
            },
        },
        '& .MuiInputLabel-root': {
            color: props.color === 'black' ? '#9af0fa' : props.color,
            letterSpacing: '0.1rem',
            fontWeight: 'bold',
            position: 'relative',
            top: '1.3rem',
            fontSize: '1.2rem',
            fontStyle: 'italic',
            '&.Mui-disabled': {
                color: 'gray',
            },
            '&.Mui-focused': {
                color: `${props.primeBg} !important`,
            },
        },
        '& .MuiInputBase-input': {
            backgroundColor: 'rgba(255,255,255,0.7)',
            fontStyle: 'italic',
        },
    }),

    githubIcon: {
        color: "green",
    },
    oAuthBtn: {
        margin: '2px',
        borderColor: "gray"
    },
    actionBtn: {
        backgroundColor: 'blue',
        color: 'white',
    },
    link: (props) => {
        return {
            textDecoration: 'none',
            fontFamily: 'cursive',
            color: props.navColor,
            fontSize: '1.2rem',
            transition: 'color 0.3s ease-in-out',
            '&:hover': {
                color: props.navActiveColor
            },
            '&.active': {
                color: props.navActiveColor,
            }
        }

    },
    searchInput: {
        '&:focus': {
            background: 'white',
        },
        '& .MuiInputAdornment-root': {
            background: 'white',
        },
    },

    gridItemBtn: (props) => {
        return {
            width: '50px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '5px',
            height: '50px',
            borderRadius: '10px',
            background: props.isCurrent ? 'white' : 'none',
            "&:hover": {
                backgroundColor: 'white',
            },
        }
    },
}));


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

export const ItemDeletingOverlay = styled('div')({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 5,
    backgroundColor: 'rgba(250,0,0,0.5)'
})

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
    opacity: 0.5,
    background: '#cec3c3',
});

