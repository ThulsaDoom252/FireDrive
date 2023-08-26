import React from 'react';
import {FcGoogle} from "react-icons/fc";
import {FaGithub} from "react-icons/fa";

const SocialAuth = ({googleAuth, githubAuth}) => {
    return (
        <>
            <hr/>
            <button
                type={'button'}
                onClick={googleAuth}
                title={'sign up with google'}
                className={'w-full btn mt-2 mb-2 btn-outline-light  text-black'}>
                <div className={'flex items-center justify-center'}>
                    <div><FcGoogle size={20} color={'blue'} className={'mx-auto'}/></div>
                    <div className={'ml-2'}>Sign in with Google</div>
                </div>
            </button>
            <button
                type={'button'}
                onClick={githubAuth}
                title={'sign up with github'}
                className={'w-full btn mt-2 mb-2 btn-outline-light text-black '}>
                <div className={'flex items-center justify-center'}>
                    <div><FaGithub size={20} color={'green'} className={'mx-auto'}/></div>
                    <div className={'ml-2'}>Sign in with Github</div>
                </div>

            </button>
        </>

    );
};

export default SocialAuth;