import React from 'react';

const ThemeImage = ({
                           url,
                           alt = 'image is broken',
                           onClick = () => void 0,
                           currentThemeName,
                           theme,
                       },

) => {
    const isCurrentTheme = currentThemeName === theme

    return (
        <div onClick={onClick} className={'w-fit p-2 relative flex justify-center items-center'}>
            <img
                style={{height: '85px'}}
                className={`

            rounded
            object-cover
            hover:cursor-pointer
             transition-all
             duration-100
           ${isCurrentTheme && 'border-2'}
             `}
                src={url}
                alt={alt}/>
        </div>
    );
};

export default ThemeImage;