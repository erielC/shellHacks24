document.addEventListener('DOMContentLoaded', async function () {
    const savedLocationType = localStorage.getItem('location');

    if (savedLocationType) {
        const locationTypeDropdown = document.getElementById('locationType');
        locationTypeDropdown.value = savedLocationType;

        // Trigger the change event to load the locations
        locationTypeDropdown.dispatchEvent(new Event('change'));
    }
});

document.getElementById('locationType').addEventListener('change', async function () {
    const locationType = this.value;
    localStorage.setItem('location',locationType);
    const locationsDropdown = document.getElementById('locations');
    
    // Clear the previous dropdown options
    locationsDropdown.innerHTML = '<option value="">--Select a location--</option>';
    
    if (locationType) {
        try {
            const response = await fetch(`http://localhost:3000/getLocations?type=${locationType}`);
            const locations = await response.json();

            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location._id;
                option.textContent = location.name;
                locationsDropdown.appendChild(option);
            });

        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    }
});

// Add an event listener to display the selected location details
document.getElementById('locations').addEventListener('change', async function () {
    const locationId = this.value;
    const locationType = document.getElementById('locationType').value;
    
    if (locationId && locationType) {
        try {
            const response = await fetch(`http://localhost:3000/showLocation?locationId=${locationId}&type=${locationType}`);
            const locationDetails = await response.text();
            document.getElementById('locationDetails').innerHTML = locationDetails;
        } catch (error) {
            console.error('Error fetching location details:', error);
        }
    }
});