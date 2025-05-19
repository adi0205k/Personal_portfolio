// Check if user is logged in
document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin.html';
    }
    loadSubmissions();
});

// Logout function
function logout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'admin.html';
}

// Load contact submissions
async function loadSubmissions() {
    try {
        const response = await fetch('http://localhost:5000/api/contacts');
        const submissions = await response.json();
        const submissionsList = document.getElementById('submissions-list');
        
        if (submissions.length === 0) {
            submissionsList.innerHTML = `
                <tr>
                    <td colspan="5" class="no-submissions">No submissions yet</td>
                </tr>
            `;
            return;
        }

        submissionsList.innerHTML = submissions.map(submission => `
            <tr>
                <td>${new Date(submission.created_at).toLocaleString()}</td>
                <td>${submission.name}</td>
                <td>${submission.email}</td>
                <td>${submission.subject}</td>
                <td>${submission.message}</td>
            </tr>
        `).join('');
    } catch (error) {
        console.error('Error loading submissions:', error);
        const submissionsList = document.getElementById('submissions-list');
        submissionsList.innerHTML = `
            <tr>
                <td colspan="5" class="error-message">Error loading submissions. Please try again.</td>
            </tr>
        `;
    }
}

// Function to add a new submission (to be called from the contact form)
function addSubmission(submission) {
    const submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
    submissions.push({
        ...submission,
        date: new Date().toISOString()
    });
    localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
} 