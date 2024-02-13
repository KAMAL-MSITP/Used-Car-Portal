async function fetchItems() {
    try {
        const response = await fetch('/usedcardetails');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        fetchItemsForSell(data);
        const carList = document.getElementById('carList');
     
        const makeDropdown = document.getElementById('Make');
      
        const locationDropdown = document.getElementById('StateOfRegistration');
        const modelDropdown = document.getElementById('Model');       
        
        const priceDropdown = document.getElementById('Price');     
        const buildyearDropdown = document.getElementById('BuildYear');       
        const kilometersDrivenDropdown = document.getElementById('KilometersDriven');       
        const descriptionDropdown = document.getElementById('description');
                   
         // Clear existing content
        carList.innerHTML = ''; 
        if (data && data.length > 0) {
            data.forEach(item => {
                const li = document.createElement('li');
                li.className = 'car-details'; // Add class for styling
                li.innerHTML = `
                    <h2>${item.Make}</h2>
                    <p>Model: ${item.Model}</p>                        
    
                    <p>Price: $${item.Price}</p>
                    <p>BuildYear: ${item.BuildYear}</p>
                    <p>KilometersDriven: ${item.KilometersDriven}</p>
                    <p>StateOfRegistration: ${item.StateOfRegistration}</p>
                    <p>Description: ${item.Description}</p>
                `;
                carList.appendChild(li);
                const optionMake = document.createElement('option');
                optionMake.value = `${item.Make}`;
                optionMake.textContent = `${item.Make}`;
                makeDropdown.appendChild(optionMake);
    
                const optionLocation = document.createElement('option');
                optionLocation.value = `${item.StateOfRegistration}`;
                optionLocation.textContent = `${item.StateOfRegistration}`;
                locationDropdown.appendChild(optionLocation);
    
                const optionModel = document.createElement('option');
                optionModel.value = `${item.Model}`;
                optionModel.textContent = `${item.Model}`;
                modelDropdown.appendChild(optionModel);
    
               
                 
                const optionPrice = document.createElement('option');
                optionPrice.value = `${item.Price}`;
                optionPrice.textContent = `${item.Price}`;
                priceDropdown.appendChild(optionPrice);
          
                const optionBuildyear = document.createElement('option');
                optionBuildyear.value = `${item.BuildYear}`;
                optionBuildyear.textContent = `${item.BuildYear}`;
                buildyearDropdown.appendChild(optionBuildyear);
    
                const optionKilometersDriven = document.createElement('option');
                optionKilometersDriven.value = `${item.KilometersDriven}`;
                optionKilometersDriven.textContent = `${item.KilometersDriven}`;
                kilometersDrivenDropdown.appendChild(optionKilometersDriven);
         
              
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No items found'; // Display a message if no items are available
            carList.appendChild(li);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        const carList = document.getElementById('carList');
        carList.innerHTML = ''; // Clear existing content
        const li = document.createElement('li');
        li.textContent = 'Error fetching data'; // Display an error message if data fetching fails
        carList.appendChild(li);
    }
    }
    async function fetchItemsForSell(data) {
        console.log("selldata");
        console.log(data);
        const makeDropdownSell = document.getElementById('MakeDropdown');
        const locationDropdownSell = document.getElementById('StateOfRegistrationSell');
        if (data && data.length > 0) {
            data.forEach(item => {
        const optionMakeSell = document.createElement('option');
        optionMakeSell.value = `${item.Make}`;
        optionMakeSell.textContent = `${item.Make}`;
        makeDropdownSell.appendChild(optionMakeSell);
    
        const optionLocationSell = document.createElement('option');
        optionLocationSell.value =`${item.StateOfRegistration}`;
        optionLocationSell.textContent = `${item.StateOfRegistration}`;
        locationDropdownSell.appendChild(optionLocationSell);
            })
        }
    }
    function getSelectedValues() {
    const selectedValues = {};
    const selects = document.querySelectorAll('select');
    console.log(selects);
    selects.forEach(select => {
    console.log(select.id)
    console.log(select.value)
    selectedValues[select.id] = select.value;
    
    });
    return selectedValues;
    }
    function applyFilter() {
    
    const selectedValues = getSelectedValues();
    console.log("Selected values:", selectedValues);
    const convertedValues = {
    ...selectedValues,
    Price: parseInt(selectedValues.Price),
    BuildYear:parseInt(selectedValues.BuildYear),
    KilometersDriven: parseInt(selectedValues.KilometersDriven),
    
    };
    // Send the selected values to the backend using AJAX
    fetch('/filterData', {
    method: 'Post',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(convertedValues),
    })
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
    })
    .then(data => {
    // Handle the response from the backend
    console.log('Response from backend:', data);
    // Do something with the response data
    const carList = document.getElementById('carList');
    carList.innerHTML = ''; 
            data.forEach(item => {
                const li = document.createElement('li');
                li.className = 'car-details'; // Add class for styling
                li.innerHTML = `
                    <h2>${item.Make}</h2>
                    <p>Model: ${item.Model}</p>                        
                   
                    <p>Price: $${item.Price}</p>
                    <p>BuildYear: ${item.BuildYear}</p>
                    <p>KilometersDriven: ${item.KilometersDriven}</p>
                    <p>StateOfRegistration: ${item.StateOfRegistration}</p>
                    <p>Description: ${item.Description}</p>
                `;
                carList.appendChild(li);
            });
    })
    .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
    });
    
    
    }
    function clearFilter(){
    fetchItems();
    }
    
    function submitSellCarDetails(){
       
        var formData = {};
    
        var dropdownMake = document.getElementById("MakeDropdown");
        formData[dropdownMake.name] = dropdownMake.value;
        
        var dropdownStateOfRegistrationSell = document.getElementById("StateOfRegistrationSell");
        formData[dropdownStateOfRegistrationSell.name] = dropdownStateOfRegistrationSell.value;
        
        var dropdownModelSell = document.getElementById("modelSell");
        formData[dropdownModelSell.name] = dropdownModelSell.value;
        
        var dropdownKmsSell = document.getElementById("kmsSell");
        formData[dropdownKmsSell.name] = parseInt(dropdownKmsSell.value);
        
        var dropdownYearSell = document.getElementById("yearSell");
        formData[dropdownYearSell.name] = parseInt(dropdownYearSell.value);
        
        var dropdownPriceSell = document.getElementById("priceSell");
        formData[dropdownPriceSell.name] = parseInt(dropdownPriceSell.value);
        
        var dropdownDescriptionSell = document.getElementById("descriptionSell");
        formData[dropdownDescriptionSell.name] = dropdownDescriptionSell.value;
        
        console.log("formData"); 
        console.log(formData); 
        fetch('/insertData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => {
            if (response.ok) {
                console.log('Data successfully inserted into MongoDB');
            } else {
                console.error('Failed to insert data into MongoDB');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
              
                
    }
    
    fetchItems();
    
    document.addEventListener('DOMContentLoaded', () => {
        if(document.getElementById('applyButton')!=null){
        document.getElementById('applyButton').addEventListener('click', applyFilter);
        document.getElementById('ClearButton').addEventListener('click', clearFilter);
        }
        else if(document.getElementById('submitSellCarDetails')!=null){
            document.getElementById('submitSellCarDetails').addEventListener('click', submitSellCarDetails);
        }
        const filterForm = document.getElementById('filterForm');
        const carList = document.getElementById('carList');
    
        // Function to fetch and display cars based on filters
        function fetchAndDisplayCars(filters) {
            // Send a POST request to fetch cars based on filters
            fetch('/api/usedcardetails/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(filters),
            })
            .then(response => response.json())
            .then(cars => {
                // Clear the existing car list
                carList.innerHTML = '';
    
                // Display the fetched cars
                cars.forEach(car => {
                    const li = document.createElement('li');
                    li.textContent = `${car.make} ${car.model} (${car.year}) - Price: ${car.price}`;
                    carList.appendChild(li);
                });
            })
            .catch(error => {
                console.error('Error fetching cars:', error);
            });
        }
    
        // Handle form submission to apply filters
        filterForm.addEventListener('submit', (event) => {
            event.preventDefault();
    
            // Gather filter values from the form
            // const filters = {
            //     make: filterForm.make.value,
            //     location: filterForm.location.value,
            //     priceLow: filterForm.priceFrom.value,
            //     priceHigh: filterForm.priceTo.value,
            //     yearFrom: filterForm.yearFrom.value,
            //     yearTo: filterForm.yearTo.value,
            //     kilometersFrom: filterForm.kilometersFrom.value,
            //     kilometersTo: filterForm.kilometersTo.value,
            //     // Add more filters as needed
            // };
    
            // // Fetch and display cars based on filters
            // fetchAndDisplayCars(filters);
        });
    });