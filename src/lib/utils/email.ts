import { transporter } from '@/lib/email/nodemailer'
import {
  generateApplicationConfirmationEmail,
  generateApplicationConfirmationText,
} from '@/lib/email/templates/application-confirmation'

interface SendApplicationConfirmationParams {
  to: string
  parentName: string
  referenceNumber: string
  childrenNames: string[]
  submissionDate: string
}

export async function sendApplicationConfirmation(
  params: SendApplicationConfirmationParams
): Promise<boolean> {
  try {
    const htmlContent = generateApplicationConfirmationEmail({
      parentName: params.parentName,
      referenceNumber: params.referenceNumber,
      childrenNames: params.childrenNames,
      submissionDate: params.submissionDate,
    })

    const textContent = generateApplicationConfirmationText({
      parentName: params.parentName,
      referenceNumber: params.referenceNumber,
      childrenNames: params.childrenNames,
      submissionDate: params.submissionDate,
    })

    const mailOptions = {
      from: {
        name: process.env.SMTP_FROM_NAME || 'Little Gems School Admissions',
        address: process.env.SMTP_FROM_EMAIL || process.env.SMTP_USER || '',
      },
      to: params.to,
      subject: `Application Received - ${params.referenceNumber}`,
      text: textContent,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)
    console.log(`Confirmation email sent to ${params.to}`)
    return true
  } catch (error) {
    console.error('Error sending confirmation email:', error)
    return false
  }
}
