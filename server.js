import express from 'express';
import cors from 'cors';
import { neon } from '@neondatabase/serverless';
import 'dotenv/config';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

const sql = neon(process.env.DATABASE_URL);

app.get('/questions', async (req, res) => {
  try {
    const questions = await sql`SELECT * FROM questions ORDER BY id ASC`;
    res.json(questions);
  } catch (err) {
    console.error('❌ Error fetching questions:', err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(port, () =>
  console.log(`🚀 Server running on http://localhost:${port}`)
);
