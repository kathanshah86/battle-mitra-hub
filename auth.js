
// Auth pages JavaScript

document.addEventListener('DOMContentLoaded', function() {
  // Login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const remember = document.getElementById('remember').checked;
      
      // This would normally send to your Flask backend
      console.log('Login attempt:', { email, password, remember });
      
      // Example login logic
      // Replace this with your actual Flask backend integration
      handleLogin(email, password, remember);
    });
  }
  
  // Signup form submission
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const confirmPassword = document.getElementById('confirmPassword').value;
      const termsAccepted = document.getElementById('terms').checked;
      
      // Validate passwords match
      if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
      }
      
      // Validate terms accepted
      if (!termsAccepted) {
        showError('You must accept the terms and conditions');
        return;
      }
      
      // This would normally send to your Flask backend
      console.log('Signup attempt:', { username, email, password, termsAccepted });
      
      // Example signup logic
      // Replace this with your actual Flask backend integration
      handleSignup(username, email, password);
    });
  }
  
  // Mock login function - replace with actual Flask backend integration
  function handleLogin(email, password, remember) {
    // This is where you would normally make an API call to your Flask backend
    // For this example, we'll simulate a successful login
    
    // Simulate API call
    simulateApiCall().then(() => {
      // Store user info in localStorage (in a real app, you'd use sessions/JWT)
      const user = {
        id: 'user123',
        email: email,
        name: 'Demo User',
        isLoggedIn: true
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect to home page
      window.location.href = 'index.html';
    }).catch(error => {
      showError(error);
    });
  }
  
  // Mock signup function - replace with actual Flask backend integration
  function handleSignup(username, email, password) {
    // This is where you would normally make an API call to your Flask backend
    // For this example, we'll simulate a successful signup
    
    // Simulate API call
    simulateApiCall().then(() => {
      // Store user info in localStorage (in a real app, you'd use sessions/JWT)
      const user = {
        id: 'user123',
        email: email,
        name: username,
        isLoggedIn: true
      };
      
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Redirect to home page
      window.location.href = 'index.html';
    }).catch(error => {
      showError(error);
    });
  }
  
  // Helper function to simulate API call
  function simulateApiCall() {
    return new Promise((resolve, reject) => {
      // Simulate network delay
      setTimeout(() => {
        // 90% chance of success
        const success = Math.random() > 0.1;
        
        if (success) {
          resolve();
        } else {
          reject('Authentication failed. Please try again.');
        }
      }, 1000);
    });
  }
  
  // Helper function to show error message
  function showError(message) {
    // Check if error element exists, if not create it
    let errorElement = document.getElementById('authError');
    if (!errorElement) {
      errorElement = document.createElement('div');
      errorElement.id = 'authError';
      errorElement.className = 'auth-error';
      
      // Add error element to the form
      const form = document.querySelector('.auth-form');
      form.insertBefore(errorElement, form.firstChild);
    }
    
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide error after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }
  
  // Add custom styles for error message
  const style = document.createElement('style');
  style.textContent = `
    .auth-error {
      background-color: rgba(239, 68, 68, 0.15);
      color: #ef4444;
      padding: 0.75rem;
      border-radius: 0.375rem;
      margin-bottom: 1rem;
      font-size: 0.875rem;
      display: none;
    }
  `;
  document.head.appendChild(style);
});
