const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());

/* Route to handle sending emails */
app.post('/send-email', (req, res) => {
  const { name, email, message, interests } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'spahiuensar@gmail.com',
      /* Generated password */
      pass: 'rjncgudldidxltgs'
    }
  });

  const mailOptions = {
    /* Sender email */
    from: 'spahiuensar@gmail.com',
    /* Recipient email */
    to: 'contact@nexiphor.com,dorantdushi@gmail.com,ensar.spahiu@hotmail.com',
    subject: 'Contact Form Submission',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}\nInterests: ${interests}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.send('Email sent successfully');
    }
  });
});

/* Start the server */
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});