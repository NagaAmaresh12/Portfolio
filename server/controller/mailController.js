import { sendContactMail } from '../utils/mailer.js';

export const sendMail = async (req, res) => {
    const { name, email, company, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        await sendContactMail({ name, email, company, subject, message });
        res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Send Mail Error:', error);
        res.status(500).json({ error: 'Failed to send email' });
    }
};
