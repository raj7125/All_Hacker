const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

let users = {};

app.use(bodyParser.json());


app.post('/signup_endpoint', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: "Username and password are required." });
    }

    if (users[username]) {
        return res.json({ success: false, message: "Username already exists." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        users[username] = { username, password: hashedPassword };
        res.json({ success: true, message: "Signup successful!" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error signing up." });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});