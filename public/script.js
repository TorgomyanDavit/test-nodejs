const submit = document.getElementById("button")
const div = document.querySelector(".innerDiv")
const input = document.querySelector(".file-input")


const setFormData = async (event) => {
    const files = event.target.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]); 
    }
  
    try {
      const response = await fetch('http://localhost:8000/generate-webp-image', {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      
      console.log('Converted images:', data);
  
    } catch (error) {
      console.error('Error uploading images:', error);
    }
};

input.addEventListener("change", setFormData);

// submit.addEventListener("click",async () => {
//     const data = await fetch('http://localhost:8000/getNICMacandIPaddress')
//     console.log(data)
// })

// submit.addEventListener("click",async () => {
//     const data = await fetch('http://localhost:8000/createInterface')
//     console.log(data)
// })

// submit.addEventListener("click",async () => {
//     const data = await fetch('http://localhost:8000/insertTags')
// submit.addEventListener("click",async () => {
//     const data = await fetch('http://localhost:8000/createInterface')
//     console.log(data)
// })

// submit.addEventListener("click",async () => {
//     const data = await fetch('http://localhost:5000/insertTags')
//     console.log(data)
// })

// submit.addEventListener('click',async () => {
//     const inputValue = document.getElementById('inputField').value
//     async function fetchSuggestedTags(selectedTags) {
//         try {
//             const response = await fetch('/tensorf-suggest-tags', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ selectedTags })
//             });
    
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
    
//             const data = await response.json();
//             console.log(data)
            
//             return data;
//         } catch (error) {
//             console.error('Error fetching suggested tags:', error);
//             return [];
//         }
//     }
//     fetchSuggestedTags([inputValue])
// })

// submit.addEventListener('click',async () => {
//     const inputValue = document.getElementById('inputField').value;
//     div.innerHTML = '<p>' + inputValue + '</p>'
// })

// submit.addEventListener("click",async () => {
//     const data = await axios.get('/openia')
//     console.log(data)
// })

// (async function() {
//     const data = await axios.get('/getHome')
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get('/threed')
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get('/stream')
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get(`http://localhost:8000/getOs`)
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get('/stream')
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get('/eventLoop')
//     console.log(data);
// })();

// (async function() {
//     const data = await axios.get('/GarbageCollection')
//     console.log(data);
// })();

// const arr = [1,2,3,4]
// const leftIndex = 0;
// const rightIndex = length - 1;   

// for (let leftIndex = 0, rightIndex = length - 1; leftIndex < rightIndex; ++leftIndex, --rightIndex) {
//     // Swap elements at leftIndex and rightIndex
//     arr[leftIndex] = arr[leftIndex] + arr[rightIndex];
//     arr[rightIndex] = arr[leftIndex] - arr[rightIndex];
//     arr[leftIndex] = arr[leftIndex] - arr[rightIndex];
// }

// let x = 5 
// let y = 7

// let tempt = x
// x = y
// y = tempt

// x = x + y // 12
// y = x - y // 5 
// x = x - y // 7

// console.log(x,y)