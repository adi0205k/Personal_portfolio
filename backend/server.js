const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Create tables if they don't exist
async function initializeDatabase() {
    try {
        // Create contacts table
        await db.query(`
            CREATE TABLE IF NOT EXISTS contacts (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                subject VARCHAR(255) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Create admin users table
        await db.query(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);

        console.log('Database initialized successfully');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
}

// Initialize database
initializeDatabase();

// Routes
// Contact form submission
app.post('/api/contact', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        
        const [result] = await db.query(
            'INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)',
            [name, email, subject, message]
        );

        res.status(201).json({ 
            success: true, 
            message: 'Message sent successfully',
            id: result.insertId 
        });
    } catch (error) {
        console.error('Error saving contact:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error saving message' 
        });
    }
});

// Get all contact submissions (protected route)
app.get('/api/contacts', async (req, res) => {
    try {
        const [contacts] = await db.query('SELECT * FROM contacts ORDER BY created_at DESC');
        res.json(contacts);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching messages' 
        });
    }
});

// Admin login
app.post('/api/admin/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        const [users] = await db.query(
            'SELECT * FROM admin_users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        const user = users[0];
        // In production, use bcrypt to compare passwords
        if (password !== user.password) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid credentials' 
            });
        }

        res.json({ 
            success: true, 
            message: 'Login successful',
            user: { id: user.id, username: user.username }
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error during login' 
        });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}); 