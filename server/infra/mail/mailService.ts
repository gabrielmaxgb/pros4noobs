export interface IMail {
    to: string;
    subject: string;
    text: string;
    html?: string;
}

export default interface IMailService {
    sendMail(mail: IMail): Promise<void>;
}

export const MailServiceSid = 'MailServiceSid';