"use client";

import { useActionForm } from "@/components/admin/use-action-form";
import { Field, FormSection, TextareaField } from "@/components/admin/fields";
import { FormMessage, type FormState } from "@/components/admin/form-message";
import { SubmitButton } from "@/components/admin/submit-button";
import { PhotoField } from "@/components/admin/photo-field";
import { saveSiteSettings } from "./actions";

export type SiteFormValues = {
  clubName: string;
  tagline: string | null;
  heroTitle: string | null;
  heroText: string | null;
  heroPhotoUrl: string | null;
  aboutText: string | null;
  coachName: string | null;
  coachBio: string | null;
  coachPhotoUrl: string | null;
  phone: string | null;
  whatsapp: string | null;
  email: string | null;
  address: string | null;
  mapUrl: string | null;
  instagram: string | null;
  facebook: string | null;
  openingHoursText: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  searchConsoleTag: string | null;
};

export function SiteForm({ s }: { s: SiteFormValues }) {
  const { state, onSubmit, pending } = useActionForm<FormState>(saveSiteSettings, {});
  const v = (x: string | null) => x ?? "";

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      <FormSection title="Ballina">
        <Field label="Emri i klubit" name="clubName" required defaultValue={s.clubName} />
        <Field label="Rreshti i vogël mbi titull" name="tagline" defaultValue={v(s.tagline)} placeholder="p.sh. Klub tenisi në Tiranë" />
        <Field label="Titulli i madh" name="heroTitle" defaultValue={v(s.heroTitle)} placeholder="p.sh. Tenis për të gjithë" />
        <TextareaField label="Teksti nën titull" name="heroText" rows={2} defaultValue={v(s.heroText)} />
        <PhotoField
          currentUrl={s.heroPhotoUrl}
          name="heroPhoto"
          removeName="removeHeroPhoto"
          label="Fotoja e sfondit"
          hint="Shfaqet pas titullit të madh, me hije blu sipër. Një foto horizontale e fushës funksionon më mirë. Deri në 5 MB."
        />
      </FormSection>

      <FormSection title="Rreth nesh">
        <TextareaField label="Për klubin" name="aboutText" rows={4} defaultValue={v(s.aboutText)} hint="Shfaqet te Kontakt / Rreth nesh." />
        <Field label="Emri i trajnerit" name="coachName" defaultValue={v(s.coachName)} />
        <TextareaField label="Biografia e trajnerit" name="coachBio" rows={3} defaultValue={v(s.coachBio)} />
        <PhotoField currentUrl={s.coachPhotoUrl} label="Fotoja e trajnerit" />
      </FormSection>

      <FormSection title="Kontakti">
        <Field label="Telefoni (shfaqet)" name="phone" type="tel" defaultValue={v(s.phone)} placeholder="+355 69 123 4567" />
        <Field
          label="Numri i WhatsApp"
          name="whatsapp"
          type="tel"
          defaultValue={v(s.whatsapp)}
          placeholder="+355691234567"
          hint="Me prefiks shteti. Të gjitha butonat e WhatsApp në faqe hapin këtë numër."
        />
        <Field label="Email" name="email" type="email" defaultValue={v(s.email)} />
        <Field label="Adresa" name="address" defaultValue={v(s.address)} />
        <Field label="Lidhja e hartës (Google Maps)" name="mapUrl" type="url" defaultValue={v(s.mapUrl)} placeholder="https://maps.app.goo.gl/…" />
        <Field label="Orari i hapjes (tekst)" name="openingHoursText" defaultValue={v(s.openingHoursText)} placeholder="p.sh. Çdo ditë 08:00–22:00" />
        <Field label="Instagram" name="instagram" type="url" defaultValue={v(s.instagram)} placeholder="https://instagram.com/…" />
        <Field label="Facebook" name="facebook" type="url" defaultValue={v(s.facebook)} placeholder="https://facebook.com/…" />
      </FormSection>

      <FormSection title="Google (SEO)">
        <Field label="Titulli në Google" name="seoTitle" defaultValue={v(s.seoTitle)} maxLength={120} hint="Deri në 60 karaktere shfaqen plotësisht." />
        <TextareaField label="Përshkrimi në Google" name="seoDescription" rows={2} defaultValue={v(s.seoDescription)} maxLength={300} hint="Deri në 160 karaktere." />
        <Field label="Google Search Console (kodi i verifikimit)" name="searchConsoleTag" defaultValue={v(s.searchConsoleTag)} hint="Vetëm vlera e content nga meta-etiketa që jep Google." />
      </FormSection>

      <FormMessage state={state} />
      <SubmitButton pending={pending}>Ruaj faqen</SubmitButton>
    </form>
  );
}
