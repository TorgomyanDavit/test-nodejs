const submit = document.getElementById("button")
const saveExcellFile = document.getElementById("upload")
const div = document.querySelector(".innerDiv")
const input = document.querySelector(".file-input")


submit.addEventListener("click", async () => {
    const data = await fetch('http://127.0.0.1:8000/customPageClick').then((res) => res.json())
    console.log(data);
})

submit.addEventListener("click", sendProductReport);


// const sendProductReport = async (event) => {
//   event.preventDefault();
//   try {
//         const response = await fetch("http://127.0.0.1:8000/api/ProductReport/add", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 sap_code: "111113",
//                 sap_code_name: "Թեստտտտտտտ",
//                 category_sap_code: 5050203,
//                 category_sap_code_name: "Թեստտտտտտտտտտ",
//                 main_reason: 1, // collectorProduct.Comment === "Մնացորդ" ? 1 : collectorProduct.Comment === "Ժամկետ" ? 3 : 2,
//                 user_basket_count: 1000 , // product.IsKilogram ? orderDetails.Weight : orderDetails.Quantity,
//                 stock_count: 14318, // product.IsKilogram ? collectorProduct.StockWeight : collectorProduct.StockCount,
//                 unit_price: 1390, // orderDetails.UnitPrice,
//                 branch: "PR10", // branch,
//                 date: "12/2/2024 6:59:25 AM", // collectorProduct.CreatedDt.toISOString(),
//                 image: "https://media.yerevan-city.am/api/Image/Resize/ProductPhoto/ei_17331230437433329861675416794749-638687342777016072.jpg/400/400/false",
//                 is_kilogram: 1, // product.IsKilogram,
//                 order_id: 1819484, // order.Id
//             }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Error fetching CSV file:", errorText);
//             return;
//         }


//         const responseJson = await response.json();
//         console.log(responseJson,"responseJson")
//         debugger


//   } catch (error) {
//       console.error("Error:", error);
//   }
// };

// submit.addEventListener("click", sendProductReport);

// submit.addEventListener("click", async () => {
//     const data = await fetch('http://127.0.0.1:8000/api/GetExcelNew/2707').then((res) => res.json())
//     console.log(data);
// })

// const saveExcellFileHandler = async (event) => { 
//   event.preventDefault();
//   try {
//         //   const response = await fetch("http://127.0.0.1:8000/api/GetExcelNew", {
//         const response = await fetch("https://stockapi.yerevan-city.am/api/deletedItems", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 date_from:"2025-03-05T11:50:46.974Z",
//                 date_to:"2025-03-06T11:50:46.974Z"
//             }),
//         });

//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error("Error fetching CSV file:", errorText);
//             return;
//         }


//         const responseJson = await response.json();
//         // console.log(responseJson,"responseJson")

//         debugger
//         // Create a temporary URL for the file
//         // const blob = await response.blob();

//         // const url = window.URL.createObjectURL(blob);
//         // const a = document.createElement("a");
//         // a.href = url;
//         // a.download = "ProductsReport.csv";
//         // document.body.appendChild(a);
//         // a.click();

//         // Cleanup
//         window.URL.revokeObjectURL(url);
//         a.remove();
//   } catch (error) {
//       console.error("Error:", error);
//   }
// };

// saveExcellFile.addEventListener("click", saveExcellFileHandler);



// const setFormData = async (event) => {
//     const files = event.target.files;
//     const formData = new FormData();
//     debugger
//     for (let i = 0; i < files.length; i++) {
//       formData.append('images', files[i]); 
//     }
  
//     try {
//       const response = await fetch('http://localhost:8000/generate-webp-image', {
//         method: 'POST',
//         body: formData,
//       });
  
//       const data = await response.json();
      
//       console.log('Converted images:', data);
  
//     } catch (error) {
//       console.error('Error uploading images:', error);
//     }
// };

// input.addEventListener("change", setFormData);

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