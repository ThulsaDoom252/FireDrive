import {makeStyles} from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    gitIcon: {
        color: "green",
    },
    socialBtn: {
        margin: '2px',
        borderColor: "gray"
    },
    mediaNavBtn: {
        borderRadius: '10px',
        color: 'black',
        "&:hover": {
            color: 'white',
            backgroundColor: "rgba(0, 0, 139, 0.5)", // Тут определяется полупрозрачный цвет
        },
    },
    // modal: {
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // modalContent: {
    //     backgroundColor: "white",
    //     borderRadius: "10px",
    //     outline: "none",
    //     padding: "20px",
    // },
}));


export const authInput = {
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
                // backgroundColor: "rgba(255, 255, 255, 0.5)",
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

