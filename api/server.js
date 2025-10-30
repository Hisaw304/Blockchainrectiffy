import express from "express";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "maxajima@gmail.com",
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/send", (req, res) => {
  const message = req.body.message;

  const mailOptions = {
    from: "maxajima@gmail.com",
    to: "maxajima@gmail.com",
    subject: "New Website Message",
    text: message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.send("Error sending message.");
    }
    res.send("Message sent successfully!");
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
