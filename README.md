# Dinner Decider

## Overview

Dinner Decider is a full-stack application designed to solve a common problem: deciding where to go out for dinner with friends. Many groups of friends want to explore new restaurants but struggle to remember options, reach consensus, or keep track of places they've already tried. Dinner Decider simplifies this process by allowing users to:

* Create a wishlist of restaurants to try
* Mark and rate tried restaurants
* Create dinner plans with friends
* Track RSVP status for each invitee
* Randomly generate a restaurant for the event from a pool of users' wishlisted restaurants and event filters

The app combines **React (Vite)** on the frontend with a **Flask** backend, integrating **Google Authentication**, the **Google Places API**, dynamic state management, and responsive UI design to create a seamless social planning experience.

This is the repo and code for the React frontend.
You will be able to find the backend repo here: https://github.com/mfdigug/phase-5-project-server

You can also find a demo video here: https://youtu.be/BIpvjqThPIo

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Setup & Installation](#setup--installation)
4. [Acknowledgements](#acknowledgements)

---

## Tech Stack

**Frontend:**

* React (functional components, hooks)
* React Router for navigation
* Context API for global state management
* FontAwesome for icons
* Custom hooks for events, invitees, and RSVP handling

**Backend:**

* Flask RESTful API
* SQLAlchemy ORM with Flask-Migrate
* Flask-Bcrypt for password hashing
* Flask-CORS for cross-origin requests
* Google OAuth authentication
* Google Places API integration (Autocomplete, Place Details, Nearby Search and Photos)

**Database:**

* PostgreSQL (production)
* SQLite (local development)

**Authentication:**

* Email/password login
* Google OAuth login

**Deployment Considerations:**

* Secure cookie management for Safari/iOS
* Handling CORS preflight requests for login and data fetching

---

## Features

### Track Restaurants

* Search for restaurants using the Google Places API
* Add new restaurants to your wishlist
* View wishlisted restaurants with Google Places details including photos, cuisine, price level and website
* Mark restaurants as tried and rate them for your personal reference

### Dinner Planning

* Create events and set restaurant filters including cuisine, price and location
* Invite friends to events using autocomplete search
* Generate a random restaurant selection based on attendees' wishlisted restaurants and event filters

### RSVP Tracking & Event Views

* RSVP options: "Invited", "Accepted", "Declined"
* Real-time updates reflected in the frontend
* Separate handling for events you created vs. events you were invited to

---

## Setup & Installation

### Frontend

```bash
# Clone repository
git clone <repo_url>

# Install dependencies
npm install

# Create a .env file
VITE_API_URL=http://localhost:5000

# Update Login.jsx and Register.jsx
# with your backend Google Authentication URL if required

# Run development server
npm run dev
```

### Acknowledgements

* [PatternCraft](https://patterncraft.fun/) – background design
* [Font Awesome](https://fontawesome.com/) – icons
