"use client";

import { useState } from "react";
import { InfoIcon } from "lucide-react";
import { useTranslations } from "next-intl";

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
   const t = useTranslations('ServicesPage');

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
        {t('Section3.contactTitle')}
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
          placeholder={t('Section3.contactName')}
          value={formData.name}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, name: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="email"
          placeholder={t('Section3.contactEmail')}
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          className="p-2 rounded-md bg-gray-700 text-white placeholder-gray-400"
        />
        <input
          type="tel"
          placeholder={t('Section3.contactPhone')}
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
          <option value="">{t('Section3.selection1')}</option>
          <option value="coaching">{t('Section3.selection2')}</option>
          <option value="coaching-kid">{t('Section3.selection3')}</option>
          <option value="membership">{t('Section3.selection4')}</option>
        </select>
        <button
          type="submit"
          disabled={loading}
          className="bg-pear text-white py-2 px-4 rounded-md hover:bg-opacity-80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? t('Section3.submitting') : t('Section3.submitButton')}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
