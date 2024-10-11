const apiUrl = 'https://openapi.programming-hero.com/api/peddy/pets';
const categoriesApiUrl = 'https://openapi.programming-hero.com/api/peddy/categories';

let petsData = [];
let likedPets = [];
let activeCategory = 'All';

// Fetch pets data and categories from the API when the page loads
window.onload = async function () {
    try {
        // Fetching pets data
        const petsResponse = await fetch(apiUrl);
        const petsDataJson = await petsResponse.json();
        petsData = petsDataJson.pets;

        // Fetching categories data
        const categoriesResponse = await fetch(categoriesApiUrl);
        const categoriesDataJson = await categoriesResponse.json();
        const categoriesData = categoriesDataJson.categories.slice(0, 4); // Limit to 4 categories

        displayCategories(categoriesData);
        displayPets('All');
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Display dynamic categories with icons
function displayCategories(categoriesData) {
    const categoriesDiv = document.querySelector('.categories');

    // Loop through the categories and add each category dynamically
    categoriesData.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('px-4', 'py-2', 'border-2', 'text-black', 'rounded', 'hover:bg-green-100', 'text-xl', 'flex', 'items-center', 'mr-2', 'border-[#0E7A81]' ,'font-bold');
        button.setAttribute('data-category', category.category);
        button.onclick = () => filterByCategory(category.category);

        // Add icon to the button
        const img = document.createElement('img');
        img.src = category.category_icon;
        img.alt = category.category;
        img.classList.add('w-6', 'h-6', 'mr-2');

        // Append the icon and text to the button
        button.appendChild(img);
        button.append(category.category);
        categoriesDiv.appendChild(button);
    });
}

// Display pets based on category
function displayPets(category) {
    const petsGrid = document.getElementById('pets-grid');
    petsGrid.innerHTML = '';
    const filteredPets = category === 'All' ? petsData : petsData.filter(pet => pet.category === category);

    if (filteredPets.length === 0) {
        document.getElementById('no-pets-message').style.display = 'block';
        return;
    } else {
        document.getElementById('no-pets-message').style.display = 'none';
    }

    filteredPets.forEach(pet => {
        const petCard = document.createElement('div');
        petCard.classList.add('border', 'border-gray-300', 'p-4', 'text-center', 'bg-white', 'shadow-md', 'rounded-lg');

        petCard.innerHTML = `
            <img src="${pet.image}" alt="${pet.pet_name}" class="w-full h-auto object-cover rounded-md">
            <div class="text-start border-b pb-2">
            <h2 class="font-bold text-2xl mt-2">${pet.pet_name}</h2>

            


            <p class="text-gray-500 text-lg">
                <span class="pb-2" >
                <svg class="w-6 h-6   text-gray-500 inline-block items-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
                </svg>
                <span class="font-bold">
                Breed: 
                </span>
                ${pet.breed}
                </span>
            </p>


            <p class="text-gray-500 text-lg">
                <span class="pb-2" >

                <svg class="w-6 h-6   text-gray-500 inline-block items-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
                
                <span class="font-bold">
                Birth:
                </span>${pet.date_of_birth || 'Unknown Birth Date'}</span>
            </p>


            <p class="text-gray-500 text-lg">
                <span class="pb-2" >

                <svg class="w-6 h-6   text-gray-500 inline-block items-center"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33" />
                </svg>
              
        

  
                <span class="font-bold">
                Gender: 
                </span>${pet.gender || 'Unknown'}</span>
            </p>


            <p class="text-gray-500 text-lg">
                <span class="pb-2" >

                <svg class="w-6 h-6   text-gray-500 inline-block items-center" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
              
              
                <span class="font-bold">
                Price:  
                </span>$${pet.price || 'N/A'}</span>
            </p>

            </div>

            <div class="flex justify-around  gap-[3px]">
            <button class="mt-2 px-1  border-2 rounded border-[#0E7A81] " onclick="likePet(${pet.petId})">

            <img class="w-full " src="https://img.icons8.com/ios-glyphs/30/following.png" alt="following"/>
            
            </button>
            <button class="mt-2 px-3 py-1 border-2 border-[#0E7A81]  text-[#0E7A81] font-bold rounded" 
            onclick="showAdoptModal()">Adopt</button>
            <button class="mt-2 px-3 py-1 border-2 border-[#0E7A81] text-[#0E7A81] font-bold rounded" 
            onclick="showPetDetails(${pet.petId})">Details</button>
            </div>
        `;
        petsGrid.appendChild(petCard);
    });
}

// Filter pets by category
function filterByCategory(category) {
    activeCategory = category;
    displayPets(category);
}

// Add pet to the liked pets grid
function likePet(petId) {
    const likedPetsGrid = document.getElementById('liked-pets-grid');
    const pet = petsData.find(p => p.petId === petId);

    if (!likedPets.includes(petId)) {
        likedPets.push(petId);

        const petThumbnail = document.createElement('img');
        petThumbnail.src = pet.image;
        petThumbnail.classList.add('w-full', 'h-auto', 'border', 'border-gray-300', 'p-2', 'rounded-lg', 'object-cover');
        likedPetsGrid.appendChild(petThumbnail);
    }
}

// Sort pets by price
document.getElementById('sort-price-btn').addEventListener('click', function () {
    petsData.sort((a, b) => b.price - a.price);
    displayPets(activeCategory);
});


// Function to show pet details in a modal
function showPetDetails(petId) {
    const pet = petsData.find(p => p.petId === petId);

    // Populate the modal with pet details
    document.getElementById('modal-pet-name').innerText = pet.pet_name;
    document.getElementById('modal-pet-image').src = pet.image;
    document.getElementById('modal-pet-details').innerText = pet.pet_details;
    document.getElementById('modal-pet-breed').innerText = `Breed: ${pet.breed}`;
    document.getElementById('modal-pet-birth').innerText = `Date of Birth: ${pet.date_of_birth || 'Unknown'}`;
    document.getElementById('modal-pet-gender').innerText = `Gender: ${pet.gender || 'Unknown'}`;
    document.getElementById('modal-pet-vaccination').innerText = `Vaccination Status: ${pet.vaccinated_status}`;
    document.getElementById('modal-pet-price').innerText = `Price: $${pet.price || 'N/A'}`;

    // Show the modal
    document.getElementById('pet-details-modal').classList.remove('hidden');
}

// Close the modal
document.getElementById('close-modal-btn').addEventListener('click', function () {
    document.getElementById('pet-details-modal').classList.add('hidden');
});




// Function to show adopt modal and start countdown
function showAdoptModal() {
    const adoptModal = document.getElementById('adopt-modal');
    const countdownSpan = document.getElementById('countdown');
    let countdown = 3;

    // Show the modal
    adoptModal.classList.remove('hidden');
    
    // Set the initial countdown value
    countdownSpan.textContent = countdown;

    // Update the countdown every second
    const countdownInterval = setInterval(function () {
        countdown--;
        countdownSpan.textContent = countdown;
        
        // If countdown reaches 0, hide the modal and clear the interval
        if (countdown < 0) {
            clearInterval(countdownInterval);
            adoptModal.classList.add('hidden');
        }
    }, 1000);
}


// Display dynamic categories with icons
function displayCategories(categoriesData) {
    const categoriesDiv = document.querySelector('.categories');

    // Clear previous categories (if any)
    categoriesDiv.innerHTML = '';

    // Loop through the categories and add each category dynamically
    categoriesData.forEach(category => {
        const button = document.createElement('button');
        button.classList.add('px-4', 'py-2', 'border-2', 'text-black', 'rounded', 'hover:bg-green-100', 'text-xl', 'flex', 'items-center', 'mr-2', 'border-[#0E7A81]', 'font-bold');
        button.setAttribute('data-category', category.category);

        button.onclick = () => {
            filterByCategory(category.category);
            highlightSelectedCategory(button);
        };

        // Add icon to the button
        const img = document.createElement('img');
        img.src = category.category_icon;
        img.alt = category.category;
        img.classList.add('w-6', 'h-6', 'mr-2');

        // Append the icon and text to the button
        button.appendChild(img);
        button.append(category.category);
        categoriesDiv.appendChild(button);
    });
}

// Highlight the selected category and reset others
function highlightSelectedCategory(selectedButton) {
    // Reset the background and border for all buttons
    const buttons = document.querySelectorAll('.categories button');
    buttons.forEach(button => {
        button.classList.remove('bg-[#0E7A81]', 'text-white', 'rounded-full'); // Remove active styles
        button.classList.add('text-black', 'border-[#0E7A81]'); // Revert to default
    });

    // Apply new styles to the selected button
    selectedButton.classList.add('bg-[#0E7A81]', 'text-white', 'rounded-full'); // Add active styles
}

// Updated filterByCategory function to include loading event
async function filterByCategory(category) {
    if (activeCategory === category) {
        return; // If the category is already active, do nothing
    }

    activeCategory = category;

    // Show spinner and highlight the selected category button
    const selectedButton = document.querySelector(`button[data-category="${category}"]`);
    highlightSelectedCategory(selectedButton);

    // Show the loading spinner
    document.getElementById('loading-spinner').classList.remove('hidden');

    // Add a 2-second delay before loading pets
    await new Promise(resolve => setTimeout(resolve, 2000)); // 2000ms = 2 seconds

    document.getElementById('loading-spinner').classList.add('hidden'); // Hide the spinner
    displayPets(activeCategory); // Load pets of the selected category
}


// Add this script after your existing code
document.querySelector(".btn").addEventListener("click", function() {
    const adoptSection = document.getElementById("adopt-section");
    adoptSection.scrollIntoView({ behavior: "smooth" });
});
