import User from "../models/user.js";
import List from "../models/list.js";
import { sendEmail } from "../config/email-config.js";

export const sendEmailToList = async (req, res) => {
  const { listId } = req.params;
  console.log(listId);
  const { subject, body } = req.body;

  try {
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ error: "List not found" });
    }

    const users = await User.find({ listId, unsubscribed:  true  });

    if (users.length === 0) {
      return res.status(400).json({ error: "No users to send email to" });
    }
    console.log(users);
    for (const user of users) {
      const customBody = body.replace(
        /\[([^\]]+)]/g,
        (_, key) => user.customProperties[key] || ""
      );
      const unsubscribeLink = `http://yourdomain.com/unsubscribe?listId=${listId}&email=${encodeURIComponent(
        user.email
      )}`;

      const mailOptions = {
        from: "tejas.work.25@gmail.com",
        to: user.email,
        subject,
        html: `${customBody}<br><br><a href="${unsubscribeLink}">Unsubscribe</a>`,
      };
      console.log(mailOptions);
      await sendEmail.sendMail(mailOptions);
    }

    res
      .status(200)
      .json({ success: true, message: "Emails sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
