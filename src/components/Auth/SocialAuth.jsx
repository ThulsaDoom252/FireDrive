import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";
import {Button, Tooltip} from "@mui/material";
import {GitHub, Google} from "@mui/icons-material";
import {useStyles} from "../mui/styles";

const SocialAuth = ({googleAuth, githubAuth, smallScreen}) => {
    const btnStyle = `
                    btn 
                    mt-2 
                    mb-2 
                    btn-outline-light  
                    text-black
                    ${smallScreen ? 'w-1/2' : 'w-full'}                   
                    `

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
                {/*<button*/}
                {/*    type={'button'}*/}
                {/*    onClick={googleAuth}*/}
                {/*    title={'sign up with google'}*/}
                {/*    className={`${btnStyle} mr-5`}>*/}
                {/*    <div className={'flex items-center justify-center'}>*/}
                {/*        <div><FcGoogle size={20} color={'blue'} className={'mx-auto'}/></div>*/}
                {/*        {!smallScreen && <div className={'ml-2'}>Sign in with Google</div>}*/}

                {/*    </div>*/}
                {/*</button>*/}
                {/*<button*/}
                {/*    type={'button'}*/}
                {/*    onClick={githubAuth}*/}
                {/*    title={'sign up with github'}*/}
                {/*    className={btnStyle}>*/}
                {/*    <div className={'flex items-center justify-center'}>*/}
                {/*        <div><FaGithub size={20} color={'green'} className={'mx-auto'}/></div>*/}
                {/*        {!smallScreen && <div className={'ml-2'}>Sign in with Github</div>}*/}

                {/*    </div>*/}

                {/*</button>*/}
            </div>
        </>

    )
        ;
};

export default SocialAuth;