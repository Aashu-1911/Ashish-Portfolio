import nodemailer from "nodemailer";

const createTransporter = () => {
  const emailBackend = process.env.EMAIL_BACKEND || "console";

  console.log("EMAIL_BACKEND:", emailBackend);

  if (emailBackend === "console") {
    console.log("Using console transport");

    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  console.log("Using SMTP transport");
  console.log("EMAIL_HOST:", process.env.EMAIL_HOST);
  console.log("EMAIL_PORT:", process.env.EMAIL_PORT);
  console.log("EMAIL_HOST_USER:", process.env.EMAIL_HOST_USER);

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
  });
};

export const sendEmail = async (req, res) => {
  try {
    console.log("========== EMAIL REQUEST RECEIVED ==========");

    const { name, email, message } = req.body;

    console.log("Name:", name);
    console.log("Email:", email);

    const recipient =
      process.env.CONTACT_RECIPIENT ||
      "ashishbiradar.1911@gmail.com";

    const transporter = createTransporter();

    console.log("Verifying transporter...");

    await transporter.verify();

    console.log("SMTP connection successful");

    const mailOptions = {
      from: process.env.EMAIL_HOST_USER,
      replyTo: email,
      to: recipient,
      subject: `Portfolio Contact Form - ${name}`,
      text: `
Name: ${name}
Email: ${email}

Message:
${message}
      `,
    };

    console.log("Sending email to:", recipient);

    const info = await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
    console.log("Message ID:", info.messageId);

    return res.status(200).json({
      success: true,
      message: "Email sent successfully!",
    });
  } catch (error) {
    console.error("========== EMAIL ERROR ==========");
    console.error(error);
    console.error("=================================");

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};