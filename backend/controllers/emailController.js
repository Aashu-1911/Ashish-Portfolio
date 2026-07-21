import { Resend } from "resend";

const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("[Resend Warning] RESEND_API_KEY environment variable is not defined!");
  }
  return new Resend(apiKey);
};

const createHtmlTemplate = ({ name, email, message, timestamp }) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f7f6; margin: 0; padding: 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .header { background: #1d3557; color: #ffffff; padding: 24px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 600; }
    .content { padding: 30px 24px; color: #333333; line-height: 1.6; }
    .field { margin-bottom: 20px; }
    .label { font-size: 12px; text-transform: uppercase; color: #6c757d; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px; }
    .value { font-size: 16px; color: #1d3557; font-weight: 500; }
    .message-box { background: #f8f9fa; border-left: 4px solid #457b9d; padding: 16px; border-radius: 4px; white-space: pre-wrap; font-size: 15px; }
    .footer { background: #eef2f5; padding: 16px 24px; text-align: center; font-size: 12px; color: #6c757d; border-top: 1px solid #e2e8f0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Portfolio Contact Form Submission</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Sender Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #457b9d; text-decoration: none;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Time</div>
        <div class="value">${timestamp}</div>
      </div>
      <div class="field">
        <div class="label">Message</div>
        <div class="message-box">${message}</div>
      </div>
    </div>
    <div class="footer">
      Sent from Ashish Portfolio Website
    </div>
  </div>
</body>
</html>
`;

export const sendEmail = async (req, res) => {
  console.log("========== EMAIL REQUEST RECEIVED (RESEND) ==========");

  try {
    const { name, email, message } = req.body || {};

    console.log(`[Resend Log] Form Name: ${name}`);
    console.log(`[Resend Log] Form Email: ${email}`);
    console.log(`[Resend Log] Message Length: ${message ? message.length : 0} chars`);

    if (!name || !name.trim()) {
      console.warn("[Validation Failed] Name is required.");
      return res.status(400).json({
        success: false,
        message: "Name is required.",
      });
    }

    if (!email || !email.trim()) {
      console.warn("[Validation Failed] Email is required.");
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    if (!message || !message.trim()) {
      console.warn("[Validation Failed] Message is required.");
      return res.status(400).json({
        success: false,
        message: "Message is required.",
      });
    }

    const recipient =
      process.env.CONTACT_RECEIVER_EMAIL ||
      process.env.CONTACT_RECIPIENT ||
      "ashishbiradar.1911@gmail.com";
    const fromAddress =
      process.env.EMAIL_FROM || "Portfolio Contact <onboarding@resend.dev>";
    const timestamp = new Date().toLocaleString("en-US", {
      dateStyle: "full",
      timeStyle: "medium",
    });

    console.log(`[Resend Log] Sender: ${fromAddress}`);
    console.log(`[Resend Log] Recipient: ${recipient}`);
    console.log(`[Resend Log] Reply-To: ${email}`);

    const resend = getResendClient();

    const emailPayload = {
      from: fromAddress,
      to: [recipient],
      replyTo: email,
      subject: `Portfolio Contact Form - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nTime: ${timestamp}\n\nMessage:\n${message}`,
      html: createHtmlTemplate({ name, email, message, timestamp }),
    };

    console.log("[Resend Log] Dispatching email via Resend SDK...");
    const { data, error } = await resend.emails.send(emailPayload);

    if (error) {
      console.error("========== RESEND API ERROR ==========");
      console.error("[Resend Error Message]:", error.message);
      console.error("[Resend Error Details]:", error);
      console.error("=======================================");

      return res.status(500).json({
        success: false,
        message: `Failed to send email: ${error.message}`,
      });
    }

    console.log("[Resend Log] Email sent successfully!");
    console.log(`[Resend Log] Resend Email ID: ${data?.id || "N/A"}`);
    console.log("====================================================");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully.",
    });
  } catch (error) {
    console.error("========== UNEXPECTED EMAIL ERROR ==========");
    console.error("[Exception]:", error.message);
    console.error("============================================");

    return res.status(500).json({
      success: false,
      message: "Failed to send email.",
    });
  }
};