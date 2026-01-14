// Vercel Serverless Function to handle Gemini API calls
export default async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

    // Handle preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { message, history } = req.body;

        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }

        // Get API key from environment variable
        const API_KEY = process.env.GEMINI_API_KEY;
        
        if (!API_KEY) {
            console.error('GEMINI_API_KEY environment variable is not set');
            return res.status(500).json({ error: 'API key not configured. Please add GEMINI_API_KEY to environment variables.' });
        }

        // Build conversation context
        let fullContext = '';
        if (history && history.length > 0) {
            fullContext = history.map(msg => 
                `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}`
            ).join('\n') + '\n';
        }
        fullContext += `User: ${message}`;

        // Call Gemini API
        const apiResponse = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: fullContext
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.7,
                        maxOutputTokens: 1000,
                    }
                })
            }
        );

        if (!apiResponse.ok) {
            const errorData = await apiResponse.json();
            console.error('Gemini API error:', errorData);
            throw new Error(errorData.error?.message || 'API request failed');
        }

        const data = await apiResponse.json();
        const assistantMessage = data.candidates[0].content.parts[0].text;

        return res.status(200).json({ 
            message: assistantMessage 
        });

    } catch (error) {
        console.error('Handler error:', error);
        return res.status(500).json({ 
            error: error.message || 'Internal server error' 
        });
    }
}
