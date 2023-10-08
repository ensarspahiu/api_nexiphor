const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'Outlook',
  auth: {
    user: 'ensar.spahiu@hotmail.com',
    pass: 'Ensarspahiu1',
  },
});

async function sendEmail(name, email, message, interests, res) {
  try {
    const mailOptions = {
      /* Sender email */
      from: 'ensar.spahiu@hotmail.com', // Update to your Hotmail email
      /* Recipient email */
      to: 'contact@nexiphor.com,dorantdushi@gmail.com,spahiuensar@gmail.com',
      subject: 'Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nInterests: ${interests}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    res.setHeader('Cache-Control', 'no-store');

    res.send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
}

/* Route to handle sending emails */
app.post('/send-email', (req, res) => {
  const { name, email, message, interests } = req.body;
  sendEmail(name, email, message, interests, res);
});

/* Warm-up endpoint */
app.get('/warm-up', (req, res) => {
  res.send('Server is awake and warmed up.');
});

/* Start the server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});