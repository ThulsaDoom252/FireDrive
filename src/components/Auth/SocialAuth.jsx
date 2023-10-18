import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {Button, Tooltip} from "@mui/material";
import {GitHub} from "@mui/icons-material";
import {useStyles} from "../mui/styles";

const SocialAuth = ({googleAuth, githubAuth, smallScreen}) => {
    const classes = useStyles();

    return (
        <>
            <hr/>
            <div className={`${smallScreen ? 'flex' : ''}`}>
                <Tooltip title={'Sign in with google'}>
                    <Button
                        className={classes.socialBtn}
                        onClick={googleAuth}
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        <FcGoogle size={25}/></Button></Tooltip>

                <Tooltip title={'Sign in with github'}>
                <Button
                    className={classes.socialBtn}
                    onClick={googleAuth}
                    variant="outlined"
                    color="primary"
                    fullWidth
                ><GitHub className={classes.gitIcon}/></Button>
                </Tooltip>
            </div>
        </>

    )
        ;
};

export default SocialAuth;