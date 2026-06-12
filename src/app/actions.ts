'use server';

import nodemailer from 'nodemailer';

export interface FormState {
  success: boolean;
  message: string;
  errors?: {
    name?: string[];
    email?: string[];
    subject?: string[];
    message?: string[];
  };
}

export async function sendContactEmail(prevState: FormState | null, formData: FormData): Promise<FormState> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  // Basic validation
  const errors: Record<string, string[]> = {};
  
  if (!name || name.trim() === '') {
    errors.name = ['Name is required.'];
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = ['Please enter a valid email address.'];
  }
  if (!subject || subject.trim() === '') {
    errors.subject = ['Subject is required.'];
  }
  if (!message || message.trim() === '') {
    errors.message = ['Message is required.'];
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      message: 'Please resolve the validation errors above.',
      errors,
    };
  }

  try {
    // Check for necessary environment variables
    const host = process.env.EMAIL_HOST;
    const portStr = process.env.EMAIL_PORT;
    const secureStr = process.env.EMAIL_SECURE;
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_PASS;
    const fromAddress = process.env.FROM_ADDRESS || user;

    if (!host || !portStr || !user || !pass) {
      throw new Error('Email server configuration is incomplete on the server.');
    }

    const port = parseInt(portStr);
    const secure = secureStr === 'true';

    // Create transport
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    // Verify connection configuration
    await transporter.verify();

    // 1. Send the notification email to the administrator
    await transporter.sendMail({
      from: fromAddress,
      to: user, // Send message to your personal address
      replyTo: `"${name}" <${email}>`,
      subject: `[Contact Form] ${subject} - from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">New Contact Form Message</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">You received a new inquiry from your landing page.</p>
          </div>
          <div style="padding: 24px;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; width: 30%; color: #475569;">Name</td>
                <td style="padding: 10px 0; color: #0f172a;">${name}</td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">Email</td>
                <td style="padding: 10px 0; color: #0f172a;">
                  <a href="mailto:${email}" style="color: #6366f1; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #f1f5f9;">
                <td style="padding: 10px 0; font-weight: bold; color: #475569;">Subject</td>
                <td style="padding: 10px 0; color: #0f172a;">${subject}</td>
              </tr>
            </table>
            <div style="margin-top: 20px;">
              <h4 style="margin: 0 0 10px 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Message Content</h4>
              <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; border-radius: 4px; color: #334155; white-space: pre-wrap;">${message}</div>
            </div>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            This email was sent from the TaskFlow Landing Page contact form.
          </div>
        </div>
      `,
    });

    // 2. Send the confirmation copy email to the visitor
    await transporter.sendMail({
      from: fromAddress,
      to: email, // Send to the visitor's email address
      subject: `We've received your message - TaskFlow`,
      text: `Hi ${name},\n\nThank you for reaching out to TaskFlow! We've received your message regarding "${subject}" and our team will get back to you as soon as possible.\n\nHere's a copy of your message:\n\n${message}\n\nBest regards,\nThe TaskFlow Team`,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 20px; text-align: center; color: white;">
            <h2 style="margin: 0; font-size: 24px; font-weight: bold;">Message Received</h2>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Thanks for contacting TaskFlow</p>
          </div>
          <div style="padding: 24px;">
            <p>Hi <strong>${name}</strong>,</p>
            <p>Thank you for reaching out. We have received your inquiry regarding "<strong>${subject}</strong>" and our team is already on it. We will get back to you as soon as possible.</p>
            <hr style="border: 0; border-top: 1px solid #f1f5f9; margin: 20px 0;" />
            <h4 style="margin: 0 0 10px 0; color: #475569; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em;">Your Message Preview</h4>
            <div style="background-color: #f8fafc; border-left: 4px solid #6366f1; padding: 15px; border-radius: 4px; color: #334155; white-space: pre-wrap;">${message}</div>
          </div>
          <div style="background-color: #f1f5f9; padding: 15px; text-align: center; font-size: 12px; color: #64748b;">
            This is an automated confirmation of your contact form submission. Please do not reply directly to this email.
          </div>
        </div>
      `,
    });

    return {
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
    };
  } catch (error: any) {
    console.error('SMTP Error:', error);
    return {
      success: false,
      message: error.message || 'An error occurred while sending your message. Please check the server logs.',
    };
  }
}
