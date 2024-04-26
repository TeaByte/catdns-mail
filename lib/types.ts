export interface EmailData {
  sentFrom: {
    email: string;
    user: string;
  };
  subject: string;
  data: {
    text: string;
    type: string;
    textAsHtml?: string
  };
  date: string;
}
