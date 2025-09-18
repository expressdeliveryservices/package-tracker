const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your Gmail
        pass: 'your-app-password'    // Use App Password if 2FA enabled
    }
});

app.post('/subscribe', (req, res) => {
    const { email } = req.body;
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: 'Expressdeliveryservice0016@gmail.com',
        subject: 'New Newsletter Subscription',
        text: `New subscriber email: ${email}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) return res.status(500).send(error.toString());
        res.status(200).send('Email sent');
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));
