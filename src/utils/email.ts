import { SendMailOptions } from 'nodemailer';
import config from '../config/config';
import transporter from '../apis/nodemailer';

const email: string = config.mail.user;
const clientUrl: string = config.client.client_url;

export const sendVerifyEmail = async (customerEmail: string, token: string) => {
    const mailOptions: SendMailOptions = {
        from: `Man Store <${email}>`,
        to: customerEmail,
        subject: 'Verify your Man Store account',
        html: `<p>Hi ${customerEmail},</p>
        <p>Please verify your Man Store account by clicking the link below:</p>
        <a href="${clientUrl}/verify?token=${token}">Verify</a>`,
    };

    await transporter.sendMail(mailOptions);
};
