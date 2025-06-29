import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ params, request }) => {
  return new Response(
    JSON.stringify({
      message: 'This is a test endpoint',
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

export const POST: APIRoute = async ({ request }) => {
  const data = await request.json();
  
  return new Response(
    JSON.stringify({
      message: 'Received your data!',
      data,
      timestamp: new Date().toISOString(),
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};
