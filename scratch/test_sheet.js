async function testCorrectRedirect() {
  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxctz5IVie3R-YW3EJrfqBTlDH8xaOZNA3OrWn1HDT2oZwiKrmsrinUk0hOfPxkl9KYaw/exec';
  console.log('Testing standard fetch (follow redirect)...');

  try {
    // Native fetch with redirect: follow (default) converts redirect to GET, which script.googleusercontent.com requires!
    const res = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8' // Google Apps Script requires text/plain or no-cors for JSON body string
      },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        name: 'Richard Dev Test',
        email: 'richard.dev@aevum.ai.vn',
        ide: 'Cursor IDE',
        role: 'Solo Developer',
        primaryPainPoint: 'Testing Email & Sheet Sync',
        desiredFeature: 'Multi-Agent Squad Orchestration',
        agentName: 'Lyna Agent',
        agentVibe: 'Chuyên nghiệp',
        customNotes: 'Direct API Test'
      })
    });

    console.log('Final Status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Final Text Response:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

testCorrectRedirect();
