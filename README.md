# Personal Portfolio Website

A modern, responsive personal portfolio website with contact form functionality and admin dashboard.

## Features

- Responsive design
- Contact form with database storage
- Admin dashboard to view messages
- Modern UI with animations
- Dark mode support
- Mobile-friendly navigation

## Tech Stack

- Frontend:
  - HTML5
  - CSS3
  - JavaScript
  - Font Awesome Icons
  - Google Fonts

- Backend:
  - Node.js
  - Express.js
  - MySQL
  - RESTful API

## Live Demo

[View Live Demo](https://your-github-username.github.io/Personal_Portfolio)

## Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/your-github-username/Personal_Portfolio.git
cd Personal_Portfolio
```

2. Set up the backend:
```bash
cd backend
npm install
```

3. Create a `.env` file in the backend directory with your MySQL credentials:
```
DB_HOST=localhost
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_NAME=portfolio_db
PORT=5000
```

4. Set up the MySQL database:
```sql
CREATE DATABASE portfolio_db;
USE portfolio_db;

CREATE TABLE contacts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO admin_users (username, password) VALUES ('admin', 'admin123');
```

5. Start the backend server:
```bash
npm run dev
```

6. Open `index.html` in your browser to view the website.

## Admin Access

- URL: `/admin.html`
- Username: `admin`
- Password: `admin123`

## Contributing

Feel free to fork this repository and submit pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Aditya Kamble - [kambleadi0205@gmail.com](mailto:kambleadi0205@gmail.com)

Project Link: [https://github.com/your-github-username/Personal_Portfolio](https://github.com/your-github-username/Personal_Portfolio) 