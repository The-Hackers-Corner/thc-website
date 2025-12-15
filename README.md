# THC Website

This is the official website for The Hackers Corner (THC) club. It is a web application built with Laravel and React.

## About The Project

This project serves as the main informational hub for the THC club. It provides information about the club, its members, events, and projects.

### Built With

*   **Backend:**
    *   [Laravel 12](https://laravel.com)
    *   [Inertia.js](https://inertiajs.com)
    *   [Laravel Fortify](https://laravel.com/docs/fortify)
*   **Frontend:**
    *   [React](https://reactjs.org)
    *   [Tailwind CSS](https://tailwindcss.com)
    *   [Vite](https://vitejs.dev)
    *   [Shadcn/ui](https://ui.shadcn.com/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

*   PHP >= 8.2
*   Composer
*   Node.js & npm

### Installation

1.  **Clone the repo**
    ```sh
    git clone https://github.com/your_username_/thc-website.git
    cd thc-website
    ```
2.  **Install dependencies**
    ```sh
    composer install
    npm install
    ```
3.  **Set up environment**
    ```sh
    cp .env.example .env
    php artisan key:generate
    ```
4.  **Configure your `.env` file** with your database credentials and other settings.

5.  **Run migrations**
    ```sh
    php artisan migrate
    ```

## Usage

To run the development server:

```sh
composer run dev
```

This will start the Vite development server and the Laravel development server concurrently.

To build the assets for production:

```sh
npm run build
```

## License

Distributed under the MIT License. See `LICENSE` for more information.
