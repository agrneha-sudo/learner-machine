import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://learnermachine.com'

export async function sendDownloadEmail({
  to,
  customerName,
  productTitle,
  orderId,
  downloadUrl,
}: {
  to: string
  customerName: string
  productTitle: string
  orderId: string
  downloadUrl: string
}) {
  const shortOrderId = orderId.slice(0, 8).toUpperCase()
  const fullDownloadUrl = downloadUrl.startsWith('http') ? downloadUrl : `${BASE_URL}${downloadUrl}`

  await resend.emails.send({
    from: 'Learner Machine <support@learnermachine.com>',
    to,
    subject: `Your purchase is confirmed — ${productTitle}`,
    html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Inter,Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:#1c1917;padding:32px 40px;text-align:center;">
      <div style="font-size:28px;font-weight:900;color:#fb923c;letter-spacing:-0.5px;">Learner Machine</div>
      <div style="color:#78716c;font-size:13px;margin-top:4px;">learnermachine.com</div>
    </div>

    <!-- Body -->
    <div style="padding:40px;">
      <div style="width:56px;height:56px;background:#ecfdf5;border-radius:50%;margin:0 auto 20px;display:flex;align-items:center;justify-content:center;text-align:center;line-height:56px;font-size:28px;">✅</div>

      <h1 style="text-align:center;font-size:22px;font-weight:800;color:#1c1917;margin:0 0 8px;">Payment Confirmed!</h1>
      <p style="text-align:center;color:#78716c;font-size:14px;margin:0 0 32px;">
        Hi ${customerName || 'there'}, your purchase of <strong style="color:#1c1917;">${productTitle}</strong> is ready to download.
      </p>

      <!-- Download button -->
      <div style="text-align:center;margin-bottom:32px;">
        <a href="${fullDownloadUrl}"
          style="display:inline-block;background:#c2520c;color:#ffffff;font-size:16px;font-weight:700;padding:16px 40px;border-radius:100px;text-decoration:none;">
          Open My PDF →
        </a>
      </div>

      <!-- Info box -->
      <div style="background:#faf8f5;border:1px solid #e8e0d8;border-radius:12px;padding:20px 24px;margin-bottom:28px;">
        <p style="margin:0 0 8px;font-size:13px;color:#44403c;">
          🔒 <strong>Your copy is personalised:</strong> This PDF is watermarked with your name and email address for security.
        </p>
        <p style="margin:0 0 8px;font-size:13px;color:#44403c;">
          📥 <strong>Download limit:</strong> The link works up to 5 times. Save the file to your device after opening.
        </p>
        <p style="margin:0;font-size:13px;color:#44403c;">
          🔑 <strong>Order ID:</strong> ${shortOrderId}
        </p>
      </div>

      <p style="font-size:13px;color:#78716c;text-align:center;margin:0;">
        Having trouble? Reply to this email or contact us at<br/>
        <a href="mailto:support@learnermachine.com" style="color:#c2520c;">support@learnermachine.com</a>
        &nbsp;·&nbsp; +91 89206 21043
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#faf8f5;border-top:1px solid #e8e0d8;padding:20px 40px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#a8a29e;">
        © ${new Date().getFullYear()} Learner Machine · InGadgets Pvt Ltd · Noida, UP, India<br/>
        This email was sent because you made a purchase on learnermachine.com
      </p>
    </div>

  </div>
</body>
</html>
    `.trim(),
  })
}
