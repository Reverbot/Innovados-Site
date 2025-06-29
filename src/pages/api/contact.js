import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const submissionsPath = path.join(process.cwd(), 'src', 'data', 'submissions.json');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, lastname, email, phone, message } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name, email, and phone are required fields' 
      });
    }

    // Read existing submissions
    let submissions = [];
    try {
      const fileContent = await fs.readFile(submissionsPath, 'utf-8');
      submissions = JSON.parse(fileContent);
    } catch (error) {
      console.error('Error reading submissions file, creating new one:', error);
    }

    // Add new submission
    const newSubmission = {
      id: uuidv4(),
      timestamp: new Date().toISOString(),
      name,
      lastname: lastname || '',
      email,
      phone,
      message: message || '',
      status: 'new'
    };

    submissions.push(newSubmission);

    // Write back to file
    await fs.writeFile(
      submissionsPath, 
      JSON.stringify(submissions, null, 2),
      'utf-8'
    );

    return res.status(200).json({ 
      success: true, 
      message: 'Form submitted successfully',
      submission: newSubmission
    });

  } catch (error) {
    console.error('Error processing form submission:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error processing your submission',
      error: error.message
    });
  }
}
