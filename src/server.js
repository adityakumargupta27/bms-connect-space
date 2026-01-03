
import express from 'express';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

let activeStudents = 85;
let communityOnline = 42;
let registeredMembers = 450;

const fluctuateData = () => {
  activeStudents += Math.floor(Math.random() * 5) - 2;
  communityOnline += Math.floor(Math.random() * 3) - 1;
  registeredMembers += Math.floor(Math.random() * 2);

  if (activeStudents < 50) activeStudents = 50;
  if (communityOnline < 10) communityOnline = 10;
  if (registeredMembers < 400) registeredMembers = 400;
};

setInterval(fluctuateData, 5000);

app.get('/api/students/count', (req, res) => {
  res.json({ count: activeStudents });
});

app.get('/api/community/online', (req, res) => {
  res.json({ count: communityOnline });
});

app.get('/api/members/registered', (req, res) => {
  res.json({ count: registeredMembers });
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
