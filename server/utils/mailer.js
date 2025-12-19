import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

transporter.verify((error) => {
  if (error) {
    console.error('❌ Email transporter error:', error)
  } else {
    console.log('✅ Email transporter ready')
  }
})

export const sendContactMail = async ({
  name,
  email,
  company,
  subject,
  message,
}) => {
  const mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    replyTo: email,
    subject: `📩 Portfolio Contact: ${subject}`,
    html: `
<!DOCTYPE html>
<html>
  <body style="margin:0;padding:0;background-color:#f4f6f8;font-family:Arial,Helvetica,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:30px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:10px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,0.08);">

            <!-- Header -->
            <tr>
              <td style="background:linear-gradient(135deg,#4f46e5,#6366f1);padding:24px;text-align:center;color:#ffffff;">
                <h1 style="margin:0;font-size:22px;">New Portfolio Contact</h1>
                <p style="margin:6px 0 0;font-size:14px;opacity:0.9;">
                  Someone just reached out via your website
                </p>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding:24px;color:#333333;">
                
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="padding:8px 0;"><strong>Name:</strong></td>
                    <td style="padding:8px 0;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Email:</strong></td>
                    <td style="padding:8px 0;">${email}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Company:</strong></td>
                    <td style="padding:8px 0;">${company || 'N/A'}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0;"><strong>Subject:</strong></td>
                    <td style="padding:8px 0;">${subject}</td>
                  </tr>
                </table>

                <hr style="border:none;border-top:1px solid #e5e7eb;margin:20px 0;" />

                <p style="margin:0 0 8px;"><strong>Message:</strong></p>
                <div style="background:#f9fafb;padding:16px;border-radius:8px;line-height:1.6;white-space:pre-wrap;">
                  ${message}
                </div>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb;padding:16px;text-align:center;font-size:12px;color:#6b7280;">
                This email was generated from your portfolio contact form.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
    `,
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log('✅ Email sent:', info.messageId)
    return info
  } catch (error) {
    console.error('❌ Email send failed:', error)
    throw error
  }
}
