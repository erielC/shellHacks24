document.addEventListener('DOMContentLoaded', function() {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    console.log('isLoggedIn:', isLoggedIn); // Debug log

    const contentDiv = document.getElementById('content');

    if (isLoggedIn === 'true') {
        // User is logged in, show the logged-in content
        const email = localStorage.getItem('email');
        console.log('email:', email);
    } else {
        // User is not logged in, show a different message
        alert("Error: Not Auth");
        window.location.href = 'index.html';
    }
});