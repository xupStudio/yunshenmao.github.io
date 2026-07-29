export interface WelcomeWorkflowParams {
  eventId: string;
  invoiceId: string;
  subscriptionId: string;
  customerId: string;
  customerEmail: string;
  customerName?: string;
  plan: string;
  notBeforeEpochMs: number;
}

export interface EmailAddress {
  email: string;
  name?: string;
}

export interface EmailMessageBuilder {
  to: string | EmailAddress | (string | EmailAddress)[];
  from: string | EmailAddress;
  subject: string;
  html?: string;
  text?: string;
  replyTo?: string | EmailAddress;
  headers?: Record<string, string>;
}

export interface EmailSendResult {
  messageId: string;
}

export interface EmailBinding {
  send(message: EmailMessageBuilder): Promise<EmailSendResult>;
}

export interface Env {
  WELCOME_WORKFLOW: Workflow<WelcomeWorkflowParams>;
  EMAIL: EmailBinding;
  STRIPE_WEBHOOK_SECRET: string;
  STRIPE_STATUS_PROXY_TOKEN: string;
  STRIPE_STATUS_PROXY_URL: string;
  WELCOME_DELAY_MINUTES: string;
  SENDER_EMAIL: string;
  SENDER_NAME: string;
  REPLY_TO_EMAIL: string;
  SITE_URL: string;
  FACEBOOK_URL: string;
  CUSTOMER_PORTAL_URL: string;
}
