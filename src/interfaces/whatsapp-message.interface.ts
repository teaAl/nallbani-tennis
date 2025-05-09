interface WhatsAppMessage {
  messaging_product: string;
  from: string;
  id: string;
  timestamp: string;
  type: string;
  text?: {
    name: string;
    email: string;
    phone: string;
    service: string;
  };
}
