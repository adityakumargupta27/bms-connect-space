import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in .env file');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

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

const seedData = async () => {
    try {
        // Clear existing data
        await Comment.deleteMany({});
        await StudyMaterial.deleteMany({});
        console.log('Cleared existing data');

        // Seed Comments
        const comments = [
            {
                author: 'Advit Ajith Shanbhagh',
                avatar: 'AA',
                content: 'Anyone up for the badminton tournaments ?',
                likes: 24,
                created_at: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
            },
            {
                author: 'Aditya Rohela',
                avatar: 'AR',
                content: 'There should be a clash of clans club too.... ',
                likes: 18,
                created_at: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
            },
            {
                author: 'Aditya kumar gupta',
                avatar: 'AG',
                content: 'Anyone forming team for the hackathon this weekend ?',
                likes: 31,
                created_at: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
            },
        ];

        await Comment.insertMany(comments);
        console.log('Seeded comments');

        // Seed Study Materials
        const materials = [
            {
                title: 'Data Structures & Algorithms',
                description: 'Complete lecture notes and practice problems for DSA.',
                subject: 'Computer Science',
                file_url: 'https://www.cs.bham.ac.uk/~jxb/DSA/dsa.pdf',
                downloads: 234,
            },
            {
                title: 'Calculus Study Guide',
                description: 'Comprehensive formulas and solved examples for Calculus I & II.',
                subject: 'Mathematics',
                file_url: 'https://ocw.mit.edu/courses/mathematics/18-01-single-variable-calculus-fall-2006/lecture-notes/lecture_notes.pdf',
                downloads: 189,
            },
            {
                title: 'Physics Lab Manual',
                description: 'Experiment procedures and observations for Physics 101.',
                subject: 'Physics',
                file_url: 'https://www.iitk.ac.in/phy/New01/phy103/PHY103_Lab_Manual.pdf',
                downloads: 156,
            },
            {
                title: 'English Literature Notes',
                description: 'Character analysis and themes breakdown for Hamlet.',
                subject: 'English',
                file_url: 'https://www.gutenberg.org/files/1524/1524-h/1524-h.htm',
                downloads: 143,
            },
            {
                title: 'Introduction to Psychology',
                description: 'Basics of human behavior and mental processes.',
                subject: 'Psychology',
                file_url: 'https://openstax.org/books/psychology-2e/pages/1-introduction',
                downloads: 98,
            },
            {
                title: 'Organic Chemistry Reactions',
                description: 'Cheatsheet for common organic reactions and mechanisms.',
                subject: 'Chemistry',
                file_url: 'https://www2.chemistry.msu.edu/faculty/reusch/VirtTxtJml/Questions/problems.htm',
                downloads: 210,
            },
            {
                title: 'World History: The Modern Era',
                description: 'Key events and timelines from the 20th century.',
                subject: 'History',
                file_url: 'https://www.gutenberg.org/ebooks/10000',
                downloads: 75,
            },
            {
                title: 'Macroeconomics Principles',
                description: 'Understanding supply, demand, and fiscal policy.',
                subject: 'Economics',
                file_url: 'https://openstax.org/books/principles-macroeconomics-2e/pages/1-introduction',
                downloads: 120,
            }
        ];

        await StudyMaterial.insertMany(materials);
        console.log('Seeded study materials');

        console.log('Database seeded successfully');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
};

seedData();
