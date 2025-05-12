const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname))); // Serve static files from current directory

// MongoDB connection
const uri = mongodb+srv://evanfang:evan8698239@lyf180.4judkjx.mongodb.net/?retryWrites=true&w=majority&appName=LYF180;
const clientOptions = {
    serverApi: {
        version: '1',
        strict: true,
        deprecationErrors: true
    }
};

mongoose.connect(uri, clientOptions)
    .then(() => {
        console.log('Successfully connected to MongoDB Atlas!');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB:', error);
    });

// User Schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    goals: [{
        text: String,
        completed: Boolean,
        createdAt: { type: Date, default: Date.now }
    }],
    habits: [{
        text: String,
        completed: Boolean,
        createdAt: { type: Date, default: Date.now }
    }],
    stats: {
        goalsCompleted: { type: Number, default: 0 },
        habitsCompleted: { type: Number, default: 0 },
        streak: { type: Number, default: 0 }
    },
    moods: [{
        date: Date,
        mood: String,
        completedGoals: Number,
        completedHabits: Number
    }],
    reminders: [{
        goalId: String,
        time: String,
        active: Boolean
    }],
    suggestions: [String],
    reflections: [{
        date: { type: Date, default: Date.now },
        text: String
    }],
    unlockedBadges: [String]
});

const User = mongoose.model('User', userSchema);

// Quotes API endpoint
app.get('/api/quote', (req, res) => {
    const quotes = [
        "The journey of a thousand miles begins with a single step.",
        "Believe you can and you're halfway there.",
        "Every day is a new beginning.",
        "Small progress is still progress.",
        "You are capable of amazing things.",
        "Make today ridiculously amazing.",
        "Your potential is limitless.",
        "Dream big, work hard.",
        "Be the change you wish to see.",
        "Today is your day!"
    ];
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    res.json({ quote: randomQuote });
});

// API Routes
app.post('/api/users/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log('Registration attempt for username:', username);
        
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            console.log('Username already exists:', username);
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = new User({
            username,
            password,
            goals: [],
            habits: [],
            stats: {
                goalsCompleted: 0,
                habitsCompleted: 0,
                streak: 0
            },
            moods: [{
                date: new Date(),
                mood: 'Okay',
                completedGoals: 0,
                completedHabits: 0
            }],
            reminders: [],
            suggestions: ["Set a new goal or habit to get started!"],
            reflections: [],
            unlockedBadges: ["custom"]
        });
        
        console.log('Saving new user...');
        await user.save();
        console.log('User saved successfully');
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Registration error details:', error);
        res.status(400).json({ error: error.message });
    }
});

app.post('/api/users/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/api/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/api/users/:username', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });
        if (user) {
            // Only update fields that are present in req.body
            Object.keys(req.body).forEach(key => {
                user[key] = req.body[key];
            });
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Leaderboard API endpoint
app.get('/api/leaderboard', async (req, res) => {
    try {
        // Sort by goalsCompleted, then habitsCompleted, then streak (all descending)
        const users = await User.find({}, 'username stats')
            .sort({ 'stats.goalsCompleted': -1, 'stats.habitsCompleted': -1, 'stats.streak': -1 })
            .limit(10);
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Save reflection endpoint
app.post('/api/users/:username/reflection', async (req, res) => {
    try {
        const { username } = req.params;
        const { reflection, date } = req.body;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Use provided date or today
        let targetDate = date ? new Date(date) : new Date();
        targetDate.setHours(0, 0, 0, 0);

        // Find reflection for the target date if it exists
        const existingReflection = user.reflections.find(r => {
            const reflectionDate = new Date(r.date);
            reflectionDate.setHours(0, 0, 0, 0);
            return reflectionDate.getTime() === targetDate.getTime();
        });

        if (existingReflection) {
            // Update existing reflection
            existingReflection.text = reflection;
        } else {
            // Add new reflection
            user.reflections.push({ date: targetDate, text: reflection });
        }

        await user.save();
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get today's reflection endpoint
app.get('/api/users/:username/reflection/today', async (req, res) => {
    try {
        const { username } = req.params;
        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Get today's date at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Find today's reflection
        const todayReflection = user.reflections.find(r => {
            const reflectionDate = new Date(r.date);
            reflectionDate.setHours(0, 0, 0, 0);
            return reflectionDate.getTime() === today.getTime();
        });

        res.json({ reflection: todayReflection ? todayReflection.text : '' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all reflections for a user, sorted by date descending
app.get('/api/users/:username/reflections', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Sort reflections by date descending
        const reflections = user.reflections.sort((a, b) => new Date(b.date) - new Date(a.date));
        res.json({ reflections });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 