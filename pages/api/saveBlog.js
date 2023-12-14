import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  if (req.method === 'POST') {
    const { username, title, subject } = req.body;

    const blogData = {
      username,
      title,
      subject,
      createdAt: new Date().toISOString(),
    };

    const filePath = path.join(process.cwd(), 'data', 'blogs.json');

    try {
      // Read existing data from the file
      const existingData = fs.readFileSync(filePath, 'utf-8');

      // Parse existing data or initialize with an empty array
      const parsedData = existingData ? JSON.parse(existingData) : [];

      // Add new data
      parsedData.push(blogData);

      // Write back to the file
      fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2), 'utf-8');

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving blog:', error);
      return res.status(500).json({ error: 'Error saving blog' });
    }
  }

  return res.status(405).end();
}
