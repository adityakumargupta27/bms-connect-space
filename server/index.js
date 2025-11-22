import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

// Schemas
const commentSchema = new mongoose.Schema({
    author: String,
    avatar: String,
    content: String,
    likes: { type: Number, default: 0 },
    created_at: { type: Date, default: Date.now },
});

const studyMaterialSchema = new mongoose.Schema({
    title: String,
    description: String,
    subject: String,
    file_url: String,
    downloads: { type: Number, default: 0 },
});

const Comment = mongoose.model('Comment', commentSchema);
const StudyMaterial = mongoose.model('StudyMaterial', studyMaterialSchema);

// Routes

// Comments
app.get('/api/comments', async (req, res) => {
    try {
        const comments = await Comment.find().sort({ created_at: -1 });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/comments', async (req, res) => {
    try {
        const newComment = new Comment(req.body);
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.patch('/api/comments/:id/like', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) return res.status(404).json({ message: 'Comment not found' });

        comment.likes += 1;
        await comment.save();
        res.json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.delete('/api/comments/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id);
        res.json({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Study Materials
app.get('/api/study-materials', async (req, res) => {
    try {
        const materials = await StudyMaterial.find();
        res.json(materials);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
