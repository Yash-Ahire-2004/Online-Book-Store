// API Configuration
// This will be updated with the deployed backend URL

let API_BASE_URL = 'http://localhost:8081';

// Detect if running on GitHub Pages and use appropriate backend URL
if (window.location.hostname === 'yash-ahire-2004.github.io') {
    // Production: update this to your deployed backend URL
    API_BASE_URL = 'https://your-railway-backend-url.railway.app';
    // Once you deploy to Railway, replace above with: API_BASE_URL = 'https://[your-railway-app-name].railway.app';
} else if (window.location.hostname !== 'localhost') {
    // For other deployments
    API_BASE_URL = `https://${window.location.hostname}:8081`;
}

console.log('API Base URL:', API_BASE_URL);
