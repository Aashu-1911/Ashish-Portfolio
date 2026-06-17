import nodemailer from "nodemailer";

const createTransporter = () => {
  const emailBackend = process.env.EMAIL_BACKEND || "console";

  if (emailBackend === "console") {
    return nodemailer.createTransport({
      jsonTransport: true,
    });
  }

  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT || 587),
    secure: false,
    auth: {
      user: process.env.EMAIL_HOST_USER,
      pass: process.env.EMAIL_HOST_PASSWORD,
    },
    tls: {
      rejectUnauthorized: process.env.EMAIL_USE_TLS !== "False",
    },
  });
};

export const sendEmail = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const subject = `New Contact Form Submission from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const recipient = process.env.CONTACT_RECIPIENT || "abhishekbiradar0207@gmail.com";

    const transporter = createTransporter();

    await transporter.sendMail({
      from: email,
      to: recipient,
      subject,
      text: body,
    });

    if (process.env.EMAIL_BACKEND === "console") {
      console.log("Contact form email:", { name, email, message, to: recipient });
    }

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
