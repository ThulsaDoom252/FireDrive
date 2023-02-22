// import {useEffect, useState} from "react";
// import {storage} from "./firebase";
// import {ref, uploadBytes, listAll, getDownloadURL} from 'firebase/storage'
// import {v4} from 'uuid'
// import Photos from "./Photos";
// import Music from "./Music";
// import Videos from "./Videos";
// import {currentUser, musicPageTitle, photoPageTitle, videosPageTitle, imagesRef, videosRef, musicRef} from "./Refs";
//
// const App = () => {
//     const imageListRef = ref(storage, `${imagesRef}/${currentUser}/`)
//     const videoListRef = ref(storage, `${videosRef}/${currentUser}/`)
//     const musicListRef = ref(storage, `${musicRef}/${currentUser}/`)
//     const [fileUpload, setFileUpload] = useState(null)
//     const [currentPage, setCurrentPage] = useState('photos')
//     const [imageUrls, setImageUrls] = useState([])
//     const [videoUrls, setVideoUrls] = useState([])
//     const [musicUrls, setMusicUrls] = useState([])
//     window.file = fileUpload
//
//
//     const uploadFile = (type, folder) => {
//         !fileUpload && alert(`Select ${type} first!`)
//         const fileRef = ref(storage, `${folder}/${currentUser}/${fileUpload.name + v4()}`)
//         currentPage === 'music' && fileUpload.type !== 'audio/mpeg' ? alert('please select  and audio filetype') :
//             uploadBytes(fileRef, fileUpload).then((snapshot) => {
//                 alert('Uploaded!')
//             })
//     }
//
//
//     useEffect(() => {
//         listAll(imageListRef).then(data => data.items.forEach(item => getDownloadURL(item).then(src => setImageUrls((prev) => [...prev, src]))))
//         listAll(videoListRef).then(data => data.items.forEach(item => getDownloadURL(item).then(src => setVideoUrls((prev) => [...prev, src]))))
//         listAll(musicListRef).then(data => data.items.forEach(item => getDownloadURL(item).then(src => setMusicUrls((prev) => [...prev, src]))))
//     }, [])
//
//     return (
//         <div className="container">
//             <h1 className='header'>File uploader v.1.0.0</h1>
//             <p>
//                 <p>Enter current user name</p>
//                 <input type="text" placeholder={'current user'}/>
//             </p>
//             <p>
//                 <input onChange={(event) => {
//                     setFileUpload(event.target.files[0])
//                 }} className="upload-button" type="file"/>
//             </p>
//             <p>
//                 <button
//                     onClick={() => currentPage === 'photos' ? uploadFile('image', imagesRef) : currentPage === videosRef ? uploadFile('video', videosRef) : uploadFile(musicRef, musicRef)}>{currentPage === 'photos' ? 'Upload image' : currentPage === 'videos' ? 'Upload video' : 'Upload music'}</button>
//             </p>
//             <nav className={'navbar'}>
//                 <p onClick={() => setCurrentPage('photos')}
//                    className={currentPage === 'photos' ? 'navItem navItemActive' : 'navItem'}>Photos</p>
//                 <p onClick={() => setCurrentPage('videos')}
//                    className={currentPage === 'videos' ? 'navItem navItemActive' : 'navItem'}>Videos</p>
//                 <p onClick={() => setCurrentPage('music')}
//                    className={currentPage === 'music' ? 'navItem navItemActive' : 'navItem'}>Music</p>
//             </nav>
//             <h2>{currentPage === 'photos' ? photoPageTitle : currentPage === 'music' ? musicPageTitle : videosPageTitle}</h2>
//             {currentPage === 'photos' && <Photos images={imageUrls}/>}
//             {currentPage === 'videos' && <Videos videos={videoUrls}/>}
//             {currentPage === 'music' && <Music music={musicUrls}/>}
//         </div>
//     );
// }
//
// export default App;
