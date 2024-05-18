import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
export const sendEmail = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.Admin_Email,
    pass: process.env.Admin_Email_Pass,
  },
});
