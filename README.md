# Advaith Kandiraju Portfolio 2.0

This is a personal portfolio website built using HTML, CSS, and JavaScript. The website includes various sections like About, Projects, Experience, Education, and Contact. It is designed with a clean, modern aesthetic featuring smooth scrolling and animations for an engaging user experience.

## Features
- **Responsive Design**: The website adapts seamlessly to mobile and desktop devices.
- **Smooth Scrolling**: Smooth navigation through sections using anchor links.
- **Dynamic Project Slider**: Interactive project showcase with a carousel.
- **Interactive Experience Section**: Scrollable company experience with tooltips for more detailed descriptions.
- **Contact Form**: A simple contact form that allows users to send messages directly.

## Table of Contents
- [Overview](#overview)
- [Project Structure](#project-structure)
- [How to Update Content](#how-to-update-content)
- [Running Locally](#running-locally)
- [Publishing](#publishing)
- [License](#license)

## Overview
The website is designed using standard web technologies:
- **HTML** for structure
- **CSS** for styling and responsive design
- **JavaScript** for interactive elements like project sliders, smooth scrolling, and dynamic content loading.

### Files:
1. `index.html` - Contains the structure and content of the portfolio.
2. `styles.css` - Includes custom styles, responsive media queries, and animations.
3. `script.js` - Contains JavaScript for interactive elements and dynamic content handling.

## Project Structure

portfolio/ ├── index.html # Main HTML structure ├── styles.css # Custom CSS for styling ├── script.js # JavaScript for functionality ├── assets/ # Images, videos, and other media ├── profile-photo.jpeg ├── about.jpg ├── vid.mp4 └── [other images, videos]


### Key Components:
- **Profile Sidebar**: Displays personal information and contact details.
- **Content Area**: Contains About, Projects, Experience, Education, and Contact sections.
- **Navigation Bar**: A sticky sidebar for quick navigation between sections.

## How to Update Content

You can easily modify the content by updating the following sections:

1. **Profile Info**: Change the profile name, photo, and contact details in the `index.html`.
   
   <h2 class="profile-name">Advaith Kandiraju</h2>
   <p class="profile-degree">MS Robotics</p>
About Section: Update the introduction text and technology stack in the index.html.

<p class="intro-text">I am currently a Robotics Engineer at Rainier Labs...</p>
<ul class="tech-list">
    <li>Nvidia Isaac Lab</li>
    <li>Python</li>
    <li>C++</li>
</ul>
Projects Section: Add new projects by updating the script.js file. The carousel uses dynamic data for projects:

{
    title: "New Project Title",
    description: "A brief description of the new project.",
    link: "https://github.com/yourusername/new-project",
    image: "path/to/image.jpg"
}
Experience Section: Update company experiences and responsibilities in index.html. Each company section can be dynamically displayed using JavaScript.

Running Locally
Clone the repository:

git clone https://github.com/yourusername/portfolio.git
Open index.html in a web browser to view the site locally. No server is required as it is a static site.

Publishing
GitHub Pages:

Push your code to GitHub.
Enable GitHub Pages in the repository settings (select the main branch).
Your site will be available at https://yourusername.github.io/portfolio.
Other Hosting: You can also deploy the website using other hosting services like Netlify, Vercel, or Firebase.
