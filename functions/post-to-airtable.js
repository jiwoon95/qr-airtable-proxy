// functions/post-to-notion.js

import fetch from 'node-fetch';

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  try {
    const { qr } = req.body;

    const NOTION_TOKEN = 'ntn_b72122632012ej3jTct5JA730mZOhR8I9SsCZTSBhPl0Op';
    const DATABASE_ID = '2391ade2672180aa8a34c574b75fe227';

    const response = await fetch("https://api.notion.com/v1/pages", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": "2022-06-28"
      },
      body: JSON.stringify({
        parent: { database_id: DATABASE_ID },
        properties: {
          "QR코드": {
            title: [
              {
                text: { content: qr }
              }
            ]
          }
        }
      })
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error: 'Notion 전송 실패', detail: error });
    }

    return res.status(200).json({ message: 'Notion 저장 성공', qr });
  } catch (err) {
    return res.status(500).json({ error: '서버 오류', detail: err.message });
  }
};
