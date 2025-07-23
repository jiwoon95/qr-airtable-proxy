// Netlify function: post-to-airtable.js

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST requests allowed' });
  }

  try {
    const { qr } = req.body;

    // Airtable Webhook URL
    const airtableWebhookURL = 'https://hooks.airtable.com/workflows/v1/genericWebhook/appCbRVPuOUFBlTf5/wflKZJPR6m30Sj8qa/wtrb1hepoSX6pk8yL';

    // 전달할 데이터 구조 (필요에 따라 조정)
    const payload = {
      qr: qr
    };

    // Airtable로 POST 요청
    const response = await fetch(airtableWebhookURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(500).json({ error: 'Airtable 전송 실패', detail: errorText });
    }

    return res.status(200).json({ message: 'Airtable 전송 성공', qr });
  } catch (err) {
    return res.status(500).json({ error: '서버 내부 오류', detail: err.message });
  }
};
