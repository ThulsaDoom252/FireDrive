import React, {useState} from 'react';
import {BsPlusCircle} from "react-icons/bs";
import {GrUploadOption} from "react-icons/gr";
import {currentUser, listAllFunc} from "../../Refs";
import {storage} from "../../firebase";
import {ref, uploadBytes} from "firebase/storage";
import {v4} from "uuid";

function ButtonControls({sortedList, setSortedList, setImageUrls, updateList}) {
    const hiddenFileInput = React.useRef(null)
    const handleClick = event => hiddenFileInput.current.click()

    const uploadFile = e => {
        const upload = e.target.files[0]
        const fileRef = ref(storage, `images/${currentUser}/${upload.name + v4()}`)
        alert('proceeding...')
        uploadBytes(fileRef, upload).then((snapshot) => {
            const url = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref.bucket}/o/${encodeURIComponent(
                snapshot.ref.fullPath
            )}?alt=media`;
            alert('Uploaded!')
            if (!sortedList.includes(url)) {
                const updatedSortedList = [...sortedList, url];
                setSortedList(updatedSortedList);
                setImageUrls(updatedSortedList);
            }
            listAllFunc(setImageUrls)
        })
    }

    return (
        <div className='buttonControls-container'>
            <input ref={hiddenFileInput}
                   hidden={true} type={"file"}
                   onChange={uploadFile}/>
            <button onClick={handleClick} className={'upload-button buttonControls'}><GrUploadOption/>
            </button>
            <button className={'add-folder-button buttonControls'}><BsPlusCircle/></button>
        </div>
    );
}

export default ButtonControls;




// import React, {useState} from 'react';
// import {BsPlusCircle} from "react-icons/bs";
// import {GrUploadOption} from "react-icons/gr";
// import {currentUser, listAllFunc} from "../../Refs";
// import {storage} from "../../firebase";
// import {ref, uploadBytes} from "firebase/storage";
// import {v4} from "uuid";
//
// function ButtonControls({sortedList, setSortedList, setImageUrls}) {
//     const hiddenFileInput = React.useRef(null)
//     const handleClick = event => hiddenFileInput.current.click()
//
//     const uploadFile = e => {
//         const upload = e.target.files[0]
//         const fileRef = ref(storage, `images/${currentUser}/${upload.name + v4()}`)
//         alert('proceeding...')
//         uploadBytes(fileRef, upload).then((snapshot) => {
//             const url = `https://firebasestorage.googleapis.com/v0/b/${snapshot.ref.bucket}/o/${encodeURIComponent(
//                 snapshot.ref.fullPath
//             )}?alt=media`;
//             alert('Uploaded!')
//             const updatedSortedList = [...sortedList, url];
//             setSortedList(updatedSortedList);
//             listAllFunc(setImageUrls)
//         })
//     }
//
//     return (
//         <div className='buttonControls-container'>
//             <input ref={hiddenFileInput}
//                    hidden={true} type={"file"}
//                    onChange={uploadFile}/>
//             <button onClick={handleClick} className={'upload-button buttonControls'}><GrUploadOption/>
//             </button>
//             <button className={'add-folder-button buttonControls'}><BsPlusCircle/></button>
//         </div>
//     );
// }
//
// export default ButtonControls;