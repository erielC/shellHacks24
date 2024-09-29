document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting automatically

    const emailInput = document.getElementById('email').value;
    const errorMessage = document.getElementById('error-message');

    // Regular expression to validate the email
    const emailPattern = /^[a-zA-Z0-9]{8,10}@fiu\.edu$/;

    // Validate email
    if (emailPattern.test(emailInput)) {
        // Clear any previous error messages
        errorMessage.style.display = 'none';

        // Set login status to true in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // Store the email if needed for further actions
        localStorage.setItem('email', emailInput);

        // Redirect to the dashboard or another page
        window.location.href = '/Submission Form/Submission.html';
        //REDIRECT TO FORM
    } else {
        // Show error message
        errorMessage.textContent = 'Invalid FIU email.';
        errorMessage.style.display = 'block';
    }
});
