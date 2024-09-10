// import { MailtrapClient } from "mailtrap";
// import dotenv from "dotenv";

// dotenv.config();

// export const client = new MailtrapClient({ token: process.env.MAILTRAP_API_TOKEN! });

// export const sender = {
//   email: "kartiksojitra77@gmail.com",
//   name: "kartik Sojitra",
// };

import { MailtrapClient } from "mailtrap";
const TOKEN = "f4caaa36c8861a1232f4a2611de05a2d";

export const client = new MailtrapClient({
  token: TOKEN,
  testInboxId: 3123738,
});

export const sender = {
  email: "kartiksojitra77@gmail.com",
  name: "kartik Sojitra",
};


