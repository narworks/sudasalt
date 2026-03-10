import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Tüm alanlar zorunludur' });
  }

  if (!email.includes('@')) {
    return res.status(400).json({ error: 'Geçerli bir e-posta adresi giriniz' });
  }

  try {
    await resend.emails.send({
      from: 'Suda Salt <noreply@sudasalt.com>',
      to: ['info@sudasalt.com'],
      replyTo: email,
      subject: `İletişim Formu: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0A2540;">Yeni İletişim Formu Mesajı</h2>
          <hr style="border: 1px solid #D4A843;">
          <p><strong>Ad Soyad:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Mesaj:</strong></p>
          <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${message.replace(/\n/g, '<br>')}</p>
          <hr style="border: 1px solid #eee;">
          <p style="color: #666; font-size: 12px;">Bu mesaj sudasalt.com iletişim formu üzerinden gönderilmiştir.</p>
        </div>
      `
    });

    return res.status(200).json({ success: true, message: 'Mesajınız başarıyla gönderildi' });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.' });
  }
}
