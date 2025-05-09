"use client";

import { useState } from "react";
import { InfoIcon } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: null, message: "" });

    try {
      const currentTimestamp = Math.floor(Date.now() / 1000).toString();
      const bussinessPhoneNo = process.env.META_WHATSAPP_PHONE_ID;
      const endUserPhoneNo = formData.phone;

      const response = await fetch("/api/whatsapp-api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messaging_product: "whatsapp",
          from: endUserPhoneNo,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          type: "text",
          text: {
            body: `New Service Inquiry:\n\nName: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nService: ${formData.service}`,
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      setStatus({
        type: "success",
        message: "Thank you! We'll get back to you shortly via WhatsApp.",
      });
      setFormData({ name: "", email: "", phone: "", service: "" });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full" id="membership-form">
      <p className="text-pear/40 text-xs">
        <InfoIcon className="w-4 h-4 inline-block mr-1" />
        These info will be used to create your account and send you updates
        about your membership.
      </p>

      {status.type && (
        <div
          className={`p-3 rounded-md ${
            status.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {status.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="tel"
          placeholder="Your Phone Number"
          value={formData.phone}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, phone: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <select
          value={formData.service}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, service: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        >
          <option value="">Select a Service</option>
          <option value="coaching">Coaching for me</option>
          <option value="coaching-kid">Coaching for my kid</option>
          <option value="membership">Membership Plan</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-pear text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Sending..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
