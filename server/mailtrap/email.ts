import { generatePasswordResetEmailHtml, generateResetSuccessEmailHtml, generateWelcomeEmailHtml, htmlContent } from "./htmlEmail";
import { client, sender } from "./mailtrap";


export const sendVerificationEmail = async (email: string, verificationToken: string) => {
    const recipient = [{ email }];

    const res = await client.testing.send({
        from: sender,
        to: recipient,
        subject: 'Verify your email',
        html: htmlContent.replace("{verificationToken}", verificationToken),

        category: 'Email Verification'
    }).then((res) =>
        console.log('Email sent successfully:', res))
        .catch((err) => console.log("Error in Sending Mail", err));

}





export const sendWelcomeEmail = async (email: string, name: string) => {
    const recipient = [{ email }];
    const htmlContent = generateWelcomeEmailHtml(name);

    const res = await client.testing.send({
        from: sender,
        to: recipient,
        subject: 'Welcome to PatelEats',
        html: htmlContent,
        template_variables: {
            company_info_name: "PatelEats",
            name: name
        }
    }).then(() =>
        console.log("Send WelCome Email")
    ).catch((error) => {

        console.log(error);
        throw new Error("Failed to send welcome email")
    })

}
export const sendPasswordResetEmail = async (email: string, resetURL: string) => {
    const recipient = [{ email }];
    const htmlContent = generatePasswordResetEmailHtml(resetURL);
    try {
        const res = await client.testing.send({
            from: sender,
            to: recipient,
            subject: 'Reset your password',
            html: htmlContent,
            category: "Reset Password"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to reset password")
    }
}
export const sendResetSuccessEmail = async (email: string) => {
    const recipient = [{ email }];
    const htmlContent = generateResetSuccessEmailHtml();
    try {
        const res = await client.testing.send({
            from: sender,
            to: recipient,
            subject: 'Password Reset Successfully',
            html: htmlContent,
            category: "Password Reset"
        });
    } catch (error) {
        console.log(error);
        throw new Error("Failed to send password reset success email");
    }
}