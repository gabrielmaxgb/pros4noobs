import IMailService, { IMail } from "./mailService";

export default class ConsoleMailService implements IMailService {
    async sendMail({
        to,
        subject,
        text,
        html
    }: IMail): Promise<void> {
        console.log("Sending email...");
        console.log(`To: ${to}`);
        console.log(`Subject: ${subject}`);
        console.log(`Text: ${text}`);
        if (html) {
            console.log(`HTML: ${html}`);
        }
    }
}