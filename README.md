
# Battle Mitra - Esports Tournament Platform

This is a simplified HTML/CSS/JS version of the Battle Mitra esports tournament platform designed to be integrated with a Flask backend.

## Structure

- `index.html` - Homepage
- `tournaments.html` - Tournaments listing page
- `login.html` - Login page
- `signup.html` - Signup page
- `styles.css` - Main stylesheet
- `app.js` - Core functionality shared across pages
- `tournaments.js` - Tournaments page specific functionality
- `auth.js` - Authentication related functionality

## Integration with Flask

To integrate this frontend with a Flask backend:

1. Move all the HTML, CSS, and JS files to your Flask project's `static` and `templates` folders
2. Convert the HTML files to Flask templates by:
   - Moving common elements (header, footer) to separate template files
   - Adding Jinja2 template syntax for dynamic content
   - Replacing hardcoded links with Flask URL helpers

3. Update the JavaScript files to work with your Flask backend:
   - Replace the mock data functions with actual API calls
   - Implement proper authentication using Flask-Login
   - Add CSRF protection for forms

## Features

- Responsive design for mobile and desktop
- Tournament listings with filtering and sorting
- Authentication system (login/signup)
- Live matches display
- Player rankings

## Mock Data

The current implementation uses mock data in the JavaScript files. In a real implementation, these would be replaced with API calls to your Flask backend.

## Images

The `/images` directory contains placeholder images. You should replace these with your actual images.
