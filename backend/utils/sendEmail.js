import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config()

export const sendEmail = async (email, subject, text) => {
    try{
        const transporter = nodemailer.createTransport({
            service: process.env.SERVICE,
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: subject,
            html: text
        })

        console.log("Email Sent successfully!")
    } catch (error){
        console.log("Email not sent"+ error)
    }
}