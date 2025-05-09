// receive a message from the user and send it to the whatsapp api
const sendWhatsAppMessage = async (
  //   phoneNumberId: string,
  to: string,
  messageText: string,
  replyToMessageId?: string
) => {
  const response = await fetch(
    `${process.env.WHATSAPP_API_URL}/${process.env.WHATSAPP_API_VERSION}/${process.env.META_WHATSAPP_PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.META_WHATSAPP_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        // from: phoneNumberId,
        to: to,
        text: { body: messageText },
        ...(replyToMessageId && {
          context: { message_id: replyToMessageId },
        }),
      }),
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(JSON.stringify(error));
  }

  return await response.json();
};

export default sendWhatsAppMessage;
