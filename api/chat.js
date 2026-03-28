export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message } = req.body;

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: 'あなたは別海町のライドシェアサービスのアシスタントです。利用者や従業員からの質問に丁寧に日本語で答えてください。',
      messages: [
        { role: 'user', content: message }
      ]
    })
  });

  const data = await response.json();
  const reply = data.content[0].text;

  res.status(200).json({ reply });
}
