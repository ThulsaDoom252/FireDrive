import React from 'react';

function Gallery({images}) {
    function VerticalLine() {
        return <hr style={{border: 'none', borderRight: '2px solid black', height: '100%'}}/>;
    }

    return (

        <section className='gallery'>
            {images.map(url =>
                <img className='image' src={url} alt="image"/>
            )}
        </section>

    );
}

export default Gallery;




// import React from 'react';
// import {testImages} from "../data/sourceFiles";
// import ButtonControls from "./Common/ButtonCotnrols";
//
// function Gallery({images}) {
//     function VerticalLine() {
//         return <hr style={{border: 'none', borderRight: '2px solid black', height: '100%'}}/>;
//     }
//
//     return (
//
//         <section className='gallery'>
//             {images.map(url =>
//                 <img className='image' src={url} alt="image"/>
//             )}
//         </section>
//
//     );
// }
//
// export default Gallery;