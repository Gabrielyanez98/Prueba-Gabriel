# Mobile Device Store - Front-End Test

This project is a mini-application for purchasing mobile devices, developed as a technical assessment. It is a **Single Page Application (SPA)** built with **React**.

## 🛠️ Tech Stack
* **Framework:** React 19.
* **Language:** JavaScript (ES6+).
* **Routing:** React Router for client-side navigation.
* **Build Tool:** Vite.

## 🚀 Execution Instructions

Follow these steps to set up and run the project locally:

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Start the development server:**
    ```bash
    npm run start
    ```

3.  **Build for production:**
    ```bash
    npm run build
    ```

4.  **Run tests:**
    ```bash
    npm run test
    ```

5.  **Run code linting:**
    ```bash
    npm run lint
    ```
## 📝 Key Features & Implementation Notes

### View Structure
The application consists of two main views:
1.  **Product List Page (PLP):** Displays a grid of mobile devices with a real-time search filter.
2.  **Product Details Page (PDP):** Shows technical specifications and allows users to select options before adding a product to the cart.

### Client-Side Data Persistence (Caching)
To optimize performance and minimize API requests, a **caching system** has been implemented. 
* Data is stored locally upon retrieval.
* Cache expires after **1 hour**, after which the data is revalidated from the API.

### Routing & Navigation
* Users can navigate between views without page reloads.
* A **Breadcrumbs** component is present in the header to show the user's current location and provide navigation links.
* The application title/icon links back to the main list view.

### Shopping Cart
The cart item count is displayed in the header and persists across all views.
