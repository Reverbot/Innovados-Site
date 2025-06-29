import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const submissionsPath = path.join(process.cwd(), '..', '..', 'src', 'data', 'submissions.json');

export const post: APIRoute = async ({ request }) => {
  try {
    const data = await request.json();
    const { name, lastname, email, phone, message } = data;
    
    if (!name || !email || !phone) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Name, email, and phone are required fields' 
        }),
        { 
          status: 400, 
          headers: { 
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          } 
        }
      );
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

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Form submitted successfully',
        submission: newSubmission
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        } 
      }
    );

  } catch (error) {
    console.error('Error processing form submission:', error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Error processing your submission',
        error: error.message 
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        } 
      }
    );
  }
};

// Handle preflight requests for CORS
export const options: APIRoute = () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
