import React from 'react';
import UserAvatar from "./UserAvatar";
import UserName from "./UserName";
import UserEmail from "./UserEmail";

const CurrentUser = ({avatarMt = 5, userNameMt = 2}) => {

    return (
        <>
            <div className={`mt-${avatarMt}`}><UserAvatar/></div>
            <div className={`mt-${userNameMt}`}><UserName/></div>
            <div><UserEmail/></div>
        </>

    )
        ;
};

export default CurrentUser;