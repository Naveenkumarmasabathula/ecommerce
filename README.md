# Full-Stack E-Commerce Application

A complete single-page e-commerce web application built with a React frontend and an Express.js backend, featuring user authentication, product filtering, and a persistent shopping cart.

## Live Demo

[Link to your deployed Vercel URL will go here]

## Screenshot


*(Tip: Take a screenshot, add it to your project folder, and link to it like `![App Screenshot](./screenshot.png)`)*

---

## Features

- **User Authentication:** Secure user signup and login using JWT (JSON Web Tokens).
- **Product Catalog:** Dynamic product listing with skeleton loading states.
- **Advanced Filtering:** Filter products by category and maximum price.
- **Shopping Cart:** Add, remove, and update item quantities in the cart.
- **Persistent State:** Cart items persist even after logging out or closing the browser, thanks to `localStorage`.
- **Professional UI/UX:** Built with Material-UI for a clean, responsive design, and enhanced with toast notifications and hover animations.

---

## Tech Stack

**Frontend:**
- React 18
- React Router
- Axios
- Material-UI (MUI)
- Framer Motion (for animations)
- React Hot Toast (for notifications)
- Vite

**Backend:**
- Node.js
- Express.js
- JSON Web Tokens (JWT)
- bcrypt.js

---

## How to Run Locally

1.  Clone the repository:
    ```bash
    git clone [https://github.com/your-username/your-repo-name.git](https://github.com/your-username/your-repo-name.git)
    ```

2.  Navigate to the project directory:
    ```bash
    cd your-repo-name
    ```

3.  **Setup Backend:**
    ```bash
    cd backend
    npm install
    # Create a .env file and add a JWT_SECRET
    npm start
    ```

4.  **Setup Frontend (in a new terminal):**
    ```bash
    cd client
    npm install
    npm run dev
    ```