import nodemailer from "nodemailer";

export const createTransporter = () => {
  const emailBackend = process.env.EMAIL_BACKEND || "console";
  console.log(`[Email] Transport backend mode: ${emailBackend}`);

  if (emailBackend === "console") {
    console.log("[Email] Using console transport (JSON format)");
    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  const host = process.env.EMAIL_HOST || "smtp.gmail.com";
  const port = parseInt(process.env.EMAIL_PORT || "587", 10);
  const secure = port === 465;

  console.log(`[Email] Transport Config -> Host: ${host}, Port: ${port}, Secure: ${secure}`);
  console.log(`[Email] EMAIL_HOST_USER defined: ${Boolean(process.env.EMAIL_HOST_USER)}`);
  console.log(`[Email] EMAIL_HOST_PASSWORD defined: ${Boolean(process.env.EMAIL_HOST_PASSWORD)}`);

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });
};

export const testEmailTransporter = async (_req, res) => {
  try {
    console.log("[Email Test] Running transporter verification...");
    const transporter = createTransporter();

    if (process.env.EMAIL_BACKEND === "console") {
      return res.status(200).json({
        status: "ok",
        emailBackend: "console",
        message: "Console transport ready",
      });
    }

    await transporter.verify();
    console.log("[Email Test] SMTP Connection verified successfully!");

    return res.status(200).json({
      status: "ok",
      smtpVerified: true,
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: process.env.EMAIL_PORT || "587",
    });
  } catch (error) {
    console.error("[Email Test] SMTP Verification failed:", error.message);
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

export const sendEmail = async (req, res) => {
  console.log("========== EMAIL REQUEST RECEIVED ==========");
  try {
    const { name, email, message } = req.body || {};

    console.log(`[Email] Form Name: ${name}`);
    console.log(`[Email] Form Email: ${email}`);
    console.log(`[Email] Message Length: ${message ? message.length : 0} chars`);

    if (!name || !email || !message) {
      console.warn("[Email Validation Failed] Missing required fields");
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required fields.",
      });
    }

    const recipient = process.env.CONTACT_RECIPIENT || "ashishbiradar.1911@gmail.com";
    console.log(`[Email] Target Recipient: ${recipient}`);

    console.log("[Email] Initializing Nodemailer Transporter...");
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_HOST_USER || email}>`,
      replyTo: email,
      to: recipient,
      subject: `Portfolio Contact Form - ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    };

    console.log("[Email] Dispatching sendMail()...");
    const info = await transporter.sendMail(mailOptions);

    console.log("[Email] sendMail() completed successfully!");
    console.log(`[Email] Message ID: ${info.messageId || "console-message"}`);
    console.log("===========================================");

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error("[Email Error Details]:", error.message);
    if (error.code) console.error(`[Email Error Code]: ${error.code}`);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: `Failed to send email: ${error.message}`,
    });
  }
};