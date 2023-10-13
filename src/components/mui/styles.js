import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
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
            background: 'white', // Задаем белый фон при активации
        },
        '& .MuiInputAdornment-root': {
            background: 'white',
        },

    },
    gridItemBtn: {
        width: '50px',
        display: 'flex',
        backgroundColor: 'lightgray',
        justifyContent: 'center',
        alignItems: 'center',
        margin: '5px',
        height: '50px',
        borderRadius: '10px',
        "&:hover": {
            backgroundColor: 'white'
        },
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
            transition: 'background 0.3s, transform 0.3s, width 0.3s',
            height: '10px'
        },
        '& input:focus': {
            background: 'white',
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
