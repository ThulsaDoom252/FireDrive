import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Footer from "./components/Footer";
import Gallery from "./components/Gallery";
import Music from "./components/Music";
import Video from "./components/VIdeo";
import ButtonControls from "./components/Common/ButtonCotnrols";
import {useEffect, useState} from "react";
import {listAllFunc} from "./Refs";

const App = () => {
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        listAllFunc(setImageUrls)
    }, []);

    let sortedList = imageUrls.sort((a, b) => {
        const nameA = a.split("/").pop();
        const nameB = b.split("/").pop();
        return nameA.localeCompare(nameB);
    });

    const setSortedList = (array) => {
        sortedList = array;
    };

    return (
        <BrowserRouter>
            <div className="main-wrapper">
                {false && <Login/>}
                <Header/>
                <section className="content">
                    <div className="content-container">
                        <Routes>
                            <Route path="/gallery" element={<Gallery images={sortedList} sortedList={sortedList}
                                                                     setSortedList={setSortedList}
                                                                     setImageUrls={setImageUrls}/>}/>
                            <Route path="/music" element={<Music/>}/>
                            <Route path="/videos" element={<Video/>}/>
                        </Routes>
                        <ButtonControls sortedList={sortedList} setSortedList={setSortedList}
                                        setImageUrls={setImageUrls}/>
                    </div>
                </section>
                <Footer/>
            </div>
        </BrowserRouter>
    );
};

export default App;


//
// import Login from "./components/Login/Login";
// import Header from "./components/Header/Header";
// import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
// import Footer from "./components/Footer";
// import Gallery from "./components/Gallery";
// import Music from "./components/Music";
// import Video from "./components/VIdeo";
// import ButtonControls from "./components/Common/ButtonCotnrols";
// import {useEffect, useState} from "react";
// import {listAllFunc} from "./Refs";
//
// const App = () => {
//     const [imageUrls, setImageUrls] = useState([]);
//
//     useEffect(async () => {
//         listAllFunc(setImageUrls);
//     }, []);
//
//     let sortedList = imageUrls.sort((a, b) => {
//         const nameA = a.split("/").pop();
//         const nameB = b.split("/").pop();
//         return nameA.localeCompare(nameB);
//     });
//
//     const setSortedList = (array) => {
//         sortedList = array;
//     };
//
//     return (
//         <BrowserRouter>
//             <div className="main-wrapper">
//                 {false && <Login/>}
//                 <Header/>
//                 <section className="content">
//                     <div className="content-container">
//                         <Routes>
//                             <Route path="/gallery" element={<Gallery images={sortedList}/>}/>
//                             <Route path="/music" element={<Music/>}/>
//                             <Route path="/videos" element={<Video/>}/>
//                         </Routes>
//                         <ButtonControls sortedList={sortedList} setSortedList={setSortedList}
//                                         setImageUrls={setImageUrls}/>
//                     </div>
//                 </section>
//                 <Footer/>
//             </div>
//         </BrowserRouter>
//     );
// };
//
// export default App;