import nodemailer from 'nodemailer'

const host = process.env.SMTP_HOST;
const port = process.env.SMTP_PORT;
const user = process.env.SMTP_USERNAME;
const pass = process.env.SMTP_PASSWORD;




const transporter = nodemailer.createTransport({
    host: host,
    port : port,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
});

export function mailSender ({to, subject, body}){
    return transporter.sendMail({
        from: user,
        to,
        subject,
        html: body
    });
}