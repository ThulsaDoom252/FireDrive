let arr = [
    {index: 0, path: 'image/1'},
    {index: 0, path: 'image/0'},
    {index: 0, path: 'image/1'},
    {index: 0, path: 'image/4'},
]
let object = {index: 0, path: 'image/1'}


let stringGetter = (obj) => {
    let string = ''
    obj.path === 'image/1' ? string = 'url/path/1' : string = 'cant resolve'
    return console.log(string)
}

arr.forEach(item => stringGetter(item))

// // useEffect(() => {
// //     const vsync = new Promise((resolve, reject) => {
// //         listAll(imageListRef).then((res) => res.items.forEach((item) => getDownloadURL(item).then((url) => setImageUrlList((prev) => [...prev, url]))))
// //         resolve()
// //     }).then(() => console.log(imageUrlList))
//
//
// let finalArray = []
//
//
// const urlIterator = (array) => {
//     return new Promise((resolve) => {
//         array.forEach((item) => getDownloadURL(item).then((url) => finalArray.push({url: url})))
//         resolve()
//     })
// }
//
// const dataIterator = (array) => {
//     return new Promise((resolve) => {
//         let dataArray = []
//         array.forEach((item) => getMetadata(item).then((data) => dataArray.push(data)))
//         resolve(dataArray)
//     })
// }
//
// const finalIterator = (dataArray) => {
//     return new Promise((r) => {
//         for (let i = 0; i < dataArray.length; i++) {
//             finalArray.forEach((item) => item.size = dataArray[i])
//         }
//         r()
//     })
// }
//
// async function promiseFunc() {
//     const data = await listAll(imageListRef)
//     await urlIterator(data.items)
//     const sizes = await dataIterator(data.items)
//     await finalIterator(sizes)
//     console.log(finalArray)
//     console.log(sizes);
// }
//
// useEffect(() => {
//     promiseFunc()
// }, [])
//
// window.urls = imageUrlList
// window.sizes = imageDataList
// window.complete = imageList



