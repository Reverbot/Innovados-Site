// Simple test endpoint to verify API routes are working
export const GET = () => {
  return new Response(
    JSON.stringify({ message: 'Test endpoint is working!' }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

// Add CORS headers for preflight requests
export const OPTIONS = () => {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
};
