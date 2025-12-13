// Check API health status
async function checkHealth() {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Checking...';
    statusDiv.className = 'status-message';
    statusDiv.style.display = 'block';

    try {
        const response = await fetch('/api/health');
        const data = await response.json();
        
        statusDiv.textContent = `✅ ${data.message} - ${data.timestamp}`;
        statusDiv.className = 'status-message success';
    } catch (error) {
        statusDiv.textContent = `❌ Error: ${error.message}`;
        statusDiv.className = 'status-message error';
    }
}

// Handle contact form submission
document.getElementById('contactForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    e.target.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
