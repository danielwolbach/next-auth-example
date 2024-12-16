import nodemailer from "nodemailer";
import {
    APP_BASE_URL,
    APP_NAME,
    EMAIL_HOST,
    EMAIL_PASSWORD,
    EMAIL_PORT,
    EMAIL_USER,
} from "~/lib/environment";

const TRANSPORTER = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: EMAIL_USER &&
        EMAIL_PASSWORD && {
            user: EMAIL_USER,
            pass: EMAIL_PASSWORD,
        },
});

export async function sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
        from: `${APP_NAME} <noreply@${APP_BASE_URL}>`,
        to,
        subject,
        text,
        html: `<p>${text}</p>`,
    };

    try {
        await TRANSPORTER.sendMail(mailOptions);
    } catch (error) {
        console.error("Error sending email: ", error);
    }
}
