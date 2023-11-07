
console.log("From the frontend")
// alert("From the frontend")

const carsListEl = document.querySelector("ul#cars")

//AJAX
// fetch("http://localhost:3000/cars").then((res) => {
//     return res.json()
// }).then(data => {
//     console.log(data)
// }).catch((err) => console.log(err))

function getCars() {
    axios.get("http://localhost:3000/cars").then(res => {
        const cars = res.data[0];
        
        carsListEl.innerHTML = '';
        cars.forEach(car => {
            
            const brandId = `brand_${car.brand.replace(/\s/g, '_')}`;
            carsListEl.innerHTML += `
                <li>
                    <button onclick="removeCar('${car.brand}')" id="remove_bu">X</button>
                    ${car.brand}
                </li>
                <span>
                    <input type="text" id="${brandId}" placeholder="New Brand">
                    <button onclick="updateCarBrand('${car.brand}', '${brandId}')">Update Brand</button>
                </span>
            `
        });
    });
}

function addACar(e){
    e.preventDefault()
    const brandInput = document.querySelector("input#brand")
    
    console.log(brandInput.value)
    const data = fsx.readJsonSync("./cars.json");
    data.push({brand: brandInput.value})
    fsx.writeJsonSync("./cars.json" ,data).then((res) => {
        if(res.status == "201"){
            getCars()
        }
    })

}

function removeCar(brand) {
    axios.delete("http://localhost:3000/cars", {
      data: { brand }
    })
    .then((response) => {
      if (response.status === 201) {
        // Car was deleted successfully, update the front-end list
        getCars(); // Assuming you have a getCars function to update the list
      } else {
        // Handle errors if needed
        console.error("Failed to delete car");
      }
    })
    .catch((error) => {
      console.error("An error occurred while deleting the car:", error);
    });
  }

  function updateCarBrand(corent, inputId) {
    const newBrand = document.getElementById(inputId).value;
    console.log(newBrand);
  
    axios.put("http://localhost:3000/cars", { oldBrand: corent, newBrand })
        .then((response) => {
            if (response.status === 201) {
                // Car was updated successfully, update the front-end list or display
                // any success message if needed
                getCars(); // Assuming you have a getCars function to update the list
            } else {
                // Handle errors if needed
                console.error("Failed to update car");
            }
        })
        .catch((error) => {
            console.error("An error occurred while updating the car:", error);
        });
}
  
  




getCars()






// async function getCars(){
//     try {
//         const res = await fetch("http://localhost:3000")
        
//     } catch (error) {
//        console.log(error) 
//     }

// }

// getCars()
