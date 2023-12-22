import config from '../../config/config';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: config.mail.service,
    host: config.mail.host,
    auth: {
        user: config.mail.user,
        pass: config.mail.pass,
    },
});

export default transporter;
