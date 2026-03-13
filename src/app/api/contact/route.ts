import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Tüm alanlar zorunludur' },
        { status: 400 }
      )
    }

    if (!email.includes('@')) {
      return NextResponse.json(
        { error: 'Geçerli bir e-posta adresi giriniz' },
        { status: 400 }
      )
    }

    const resend = new Resend(process.env.RESEND_API_KEY)

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
    })

    return NextResponse.json(
      { success: true, message: 'Mesajınız başarıyla gönderildi' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Resend error:', error)
    return NextResponse.json(
      { error: 'Mesaj gönderilemedi. Lütfen daha sonra tekrar deneyin.' },
      { status: 500 }
    )
  }
}
