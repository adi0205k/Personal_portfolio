// Admin credentials (in a real application, these should be stored securely on the server)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // In production, use a secure password and proper authentication
};

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin-dashboard.html';
    }
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    try {
        const response = await fetch('http://localhost:5000/api/admin/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // Store login state
            localStorage.setItem('adminLoggedIn', 'true');
            // Redirect to dashboard
            window.location.href = 'admin-dashboard.html';
        } else {
            errorMessage.textContent = 'Invalid username or password';
        }
    } catch (error) {
        console.error('Error:', error);
        errorMessage.textContent = 'Error during login. Please try again.';
    }
}); 