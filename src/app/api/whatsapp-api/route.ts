import { NextResponse } from "next/server";
import sendWhatsAppMessage from "@/utils/sendwpMessage";

// Webhook verification
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get("hub.mode");
    const token = searchParams.get("hub.verify_token");
    const challenge = searchParams.get("hub.challenge");

    if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
      console.log("Webhook verified successfully");
      return new Response(challenge, { status: 200 });
    }

    return NextResponse.json(
      { message: "Webhook verification failed" },
      { status: 403 }
    );
  } catch (error) {
    console.error("Webhook verification error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};

// Message handling - send a message back to the user
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const message = body.text;
    console.log("Received BODY >>>> ", body);

    // Handle WhatsApp webhook notifications
    if (body.object && body.object === "whatsapp_business_account") {
      // Process webhook notification
      const entry = body.entry[0];
      const changes = entry.changes[0];

      // Log the webhook data for debugging
      console.log("Webhook notification received:", changes);

      return NextResponse.json(
        { message: "Webhook notification processed" },
        { status: 200 }
      );
    }

    const messageForEndUser = `Pershendetje ${body.name}! Ju falenderojme per mesazhin tuaj. Do te ju kontaktojme sa me shpejt te jete e mundur. Nderkohe ju lutem me konfirmoni nese te dhenat tuaja jane te sakta pasi do te perdoren per krijimin e account-it tuaj.\n \n emri: ${body.name} \n numri: ${body.phone} \n email: ${body.email} \n \n`;

    let serviceDetailsForEndUser = `\n\n Po ju nis edhe nje informacion me te detajuar mbi `;

    if (body.service === "coaching") {
      serviceDetailsForEndUser =
        serviceDetailsForEndUser +
        "kurset vetjake ne klubin tone:\n" +
        "Coaching details: \n 1. 1x1 coaching \n 2. Group coaching \n 3. Private coaching \n 4. Group training \n 5. Private training";
    }
    if (body.service === "coaching-kid") {
      serviceDetailsForEndUser =
        serviceDetailsForEndUser +
        "kurset per femije ne klubin tone:\n" +
        "Coaching details: \n 1. 1x1 coaching \n 2. Group coaching \n 3. Private coaching \n 4. Group training \n 5. Private training";
    }
    if (body.service === "membership") {
      serviceDetailsForEndUser =
        serviceDetailsForEndUser +
        "planet e membership ne klubin tone:\n" +
        "Membership details: \n 1. Monthly membership \n 2. Yearly membership \n 3. Family membership";
    }

    // Handle only text messages
    if (body.type !== "text" || !message) {
      return NextResponse.json(
        { message: "Non-text message received" },
        { status: 422 }
      );
    }

    const endUserPhoneNo = body.from;
    console.log("End user phone number:", endUserPhoneNo);
    // Send response
    const data = await sendWhatsAppMessage(
      // endUserPhoneNo,
      "355683188648",
      messageForEndUser + serviceDetailsForEndUser
    );

    console.log("Response sent:", data);

    return NextResponse.json(
      { message: "Message sent successfully", data },
      { status: 200 }
    );
  } catch (error) {
    console.error("Message handling error:", error);
    return NextResponse.json(
      { message: "Internal server error", error },
      { status: 500 }
    );
  }
};
