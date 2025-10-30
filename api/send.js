import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  // mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // your gmail
      pass: process.env.EMAIL_PASS, // your app password
    },
  });

  try {
    await transporter.sendMail({
      from: "maxajima@gmail.com",
      to: process.env.EMAIL_USER,
      subject: "New Website Message",
      text: message,
    });

    return res.status(200).json({ success: true, msg: "Message sent!" });
  } catch (err) {
    console.error("MAIL ERROR:", err);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
