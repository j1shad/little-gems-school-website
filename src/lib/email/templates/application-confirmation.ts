interface ApplicationConfirmationData {
  parentName: string
  referenceNumber: string
  childrenNames: string[]
  submissionDate: string
}

export function generateApplicationConfirmationEmail(data: ApplicationConfirmationData): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Application Confirmation</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #DC2626 0%, #2563EB 100%); padding: 40px 30px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Little Gems School</h1>
              <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">Application Received</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px 30px;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.6;">
                Dear <strong>${data.parentName}</strong>,
              </p>

              <p style="margin: 0 0 20px 0; font-size: 16px; color: #374151; line-height: 1.6;">
                Thank you for submitting an application to Little Gems School. We have successfully received your application and it is currently being reviewed by our admissions team.
              </p>

              <!-- Reference Number Box -->
              <table role="presentation" style="width: 100%; background-color: #EFF6FF; border-left: 4px solid #2563EB; border-radius: 4px; margin: 30px 0;">
                <tr>
                  <td style="padding: 20px;">
                    <p style="margin: 0 0 8px 0; font-size: 14px; color: #1E40AF; font-weight: 600;">Application Reference Number</p>
                    <p style="margin: 0; font-size: 24px; color: #1E3A8A; font-weight: bold; letter-spacing: 1px;">${data.referenceNumber}</p>
                    <p style="margin: 12px 0 0 0; font-size: 13px; color: #3B82F6;">Please save this reference number for tracking your application</p>
                  </td>
                </tr>
              </table>

              <!-- Application Details -->
              <table role="presentation" style="width: 100%; margin: 20px 0;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <p style="margin: 0; font-size: 14px; color: #6B7280;">Submission Date</p>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #111827; font-weight: 500;">${data.submissionDate}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #E5E7EB;">
                    <p style="margin: 0; font-size: 14px; color: #6B7280;">Number of Children</p>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #111827; font-weight: 500;">${data.childrenNames.length}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 12px 0;">
                    <p style="margin: 0; font-size: 14px; color: #6B7280;">Children Names</p>
                    <p style="margin: 4px 0 0 0; font-size: 15px; color: #111827; font-weight: 500;">${data.childrenNames.join(', ')}</p>
                  </td>
                </tr>
              </table>

              <!-- Next Steps -->
              <div style="background-color: #FEF3C7; border-left: 4px solid #F59E0B; border-radius: 4px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0 0 12px 0; font-size: 16px; color: #92400E; font-weight: 600;">Next Steps</p>
                <ul style="margin: 0; padding-left: 20px; color: #78350F;">
                  <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">Our admissions team will review your application within 5-7 business days</li>
                  <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">You will receive an email notification once your application has been reviewed</li>
                  <li style="margin-bottom: 8px; font-size: 14px; line-height: 1.5;">If selected, we will contact you to schedule an interview</li>
                  <li style="margin-bottom: 0; font-size: 14px; line-height: 1.5;">Keep your reference number handy for any inquiries</li>
                </ul>
              </div>

              <p style="margin: 20px 0; font-size: 16px; color: #374151; line-height: 1.6;">
                If you have any questions or need to update your application, please contact us using your reference number.
              </p>

              <p style="margin: 30px 0 0 0; font-size: 16px; color: #374151; line-height: 1.6;">
                Best regards,<br>
                <strong>Little Gems School Admissions Team</strong>
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F9FAFB; padding: 30px; text-align: center; border-top: 1px solid #E5E7EB;">
              <p style="margin: 0 0 12px 0; font-size: 14px; color: #6B7280;">
                <strong>Little Gems School</strong><br>
                Email: admissions@littlegemsschool.edu.gh<br>
                Phone: +233 XXX XXX XXX
              </p>
              <p style="margin: 12px 0 0 0; font-size: 13px; color: #9CA3AF;">
                This is an automated confirmation email. Please do not reply to this message.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim()
}

export function generateApplicationConfirmationText(data: ApplicationConfirmationData): string {
  return `
Dear ${data.parentName},

Thank you for submitting an application to Little Gems School. We have successfully received your application and it is currently being reviewed by our admissions team.

APPLICATION REFERENCE NUMBER: ${data.referenceNumber}
Please save this reference number for tracking your application.

APPLICATION DETAILS:
- Submission Date: ${data.submissionDate}
- Number of Children: ${data.childrenNames.length}
- Children Names: ${data.childrenNames.join(', ')}

NEXT STEPS:
1. Our admissions team will review your application within 5-7 business days
2. You will receive an email notification once your application has been reviewed
3. If selected, we will contact you to schedule an interview
4. Keep your reference number handy for any inquiries

If you have any questions or need to update your application, please contact us using your reference number.

Best regards,
Little Gems School Admissions Team

Little Gems School
Email: admissions@littlegemsschool.edu.gh
Phone: +233 XXX XXX XXX

This is an automated confirmation email.
  `.trim()
}
