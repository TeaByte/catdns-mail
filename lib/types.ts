export interface EmailData {
  sentFrom: {
    email: string;
    user: string;
  };
  subject: string;
  data: {
    content: string;
    type: string;
  };
  date: string;
}
