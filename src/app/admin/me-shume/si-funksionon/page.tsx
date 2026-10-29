import type { Metadata } from "next";
import Link from "next/link";
import { requireStaff } from "@/lib/auth";
import { PageHeader } from "@/components/admin/page-header";

export const metadata: Metadata = { title: "Si funksionon" };

type Step = { title: string; text: React.ReactNode; href?: string; cta?: string };

const SECTIONS: { heading: string; intro: string; steps: Step[] }[] = [
  {
    heading: "Çdo ditë",
    intro: "Skeda Sot është vendi ku filloni. Aty shihni mësimet, rezervimet dhe aktivitetet e ditës.",
    steps: [
      { title: "Merrni prezencën", text: "Hapni mësimin te Sot, shënoni kush ishte, dhe shtypni Ruaj. Nxënësit pa pagesë të muajit dalin me shenjë.", href: "/admin", cta: "Sot" },
      { title: "Anuloni një mësim", text: "Brenda mësimit, poshtë listës, zgjidhni Anulo. Ora e fushës lirohet vetë në faqe." },
      { title: "Shënoni një rezervim", text: "Kur dikush rezervon fushën me WhatsApp, shënojeni te Sot → Shëno rezervim. Ora shfaqet si e zënë në faqe menjëherë.", href: "/admin/fushat/rezervimet/i-ri", cta: "Shëno rezervim" },
    ],
  },
  {
    heading: "Nxënësit",
    intro: "Çdo nxënës ka një kartelë me grupin, pagesat dhe shënimet.",
    steps: [
      { title: "Shtoni një nxënës", text: "Nxënësit → + Nxënës i ri. Vendosni emrin, grupin dhe tarifën mujore. Prindi dhe telefoni ndihmojnë për WhatsApp.", href: "/admin/nxenesit/i-ri", cta: "Nxënës i ri" },
      { title: "Shënoni një pagesë", text: "Hapni nxënësin → Shto pagesë. Muaji merr shenjën e paguar dhe filtri “Pa paguar” e heq nga lista." },
      { title: "Shënime për prindërit", text: "Te kartela e nxënësit shtoni shënime (p.sh. “punon forehand-in”). I shihni vetëm ju dhe stafi." },
    ],
  },
  {
    heading: "Faqja publike",
    intro: "Gjithçka që shohin vizitorët ndryshohet nga Përmbajtja. Nuk ka nevojë për programues.",
    steps: [
      { title: "Grupet dhe kurset", text: "Përmbajtja → Grupet (ose Kurset). Plotësoni të dhënat, ngarkoni një foto dhe shënoni “E publikuar”. Pa shenjën, grupi mbetet draft.", href: "/admin/permbajtja/grupet", cta: "Grupet" },
      { title: "Aktivitetet", text: "Kampe, yoga, turne, trajnerë të ftuar. Kur data kalon, aktiviteti zhvendoset vetë te “Të kaluara”.", href: "/admin/permbajtja/aktivitetet", cta: "Aktivitetet" },
      { title: "Fotot, tekstet, numri i WhatsApp", text: "Përmbajtja → Faqja: titulli, fotoja kryesore, biografia e trajnerit, adresa, orari, rrjetet sociale dhe njoftimet që dalin lart në faqe.", href: "/admin/permbajtja/faqja", cta: "Faqja" },
    ],
  },
  {
    heading: "Fushat",
    intro: "Ju vendosni cilat orë shfaqen si të lira. Rezervimet dhe mësimet e grupeve i zënë vetë.",
    steps: [
      { title: "Orët e javës", text: "Fushat → Orët e javës. Për çdo ditë zgjidhni orët që ofrohen. Këto përsëriten çdo javë.", href: "/admin/fushat", cta: "Fushat" },
      { title: "Një ditë ndryshe", text: "Festë, turne ose shi? Shtoni një “Ditë të veçantë” me orë të tjera ose mbylleni fare. Vlen vetëm për atë datë." },
      { title: "Çmimet", text: "Te “Të dhënat” e fushës: çmimi për orë, çmimi për nxënësit dhe paketat me zbritje." },
    ],
  },
  {
    heading: "Siguria",
    intro: "Paneli hapet vetëm me llogarinë tuaj.",
    steps: [
      { title: "Fjalëkalimi", text: "Ndryshojeni te Më shumë sa herë të doni. Mos e ndani me askënd; administratori mund t’ju japë një të ri nëse e harroni.", href: "/admin/me-shume#fjalekalimi", cta: "Ndrysho fjalëkalimin" },
      { title: "Dilni në telefona të huaj", text: "Nëse hyni nga një telefon që s’është i juaji, shtypni Dil kur mbaroni." },
    ],
  },
];

export default async function HowItWorksPage() {
  await requireStaff();
  return (
    <>
      <PageHeader eyebrow="Më shumë" title="Si funksionon" back={{ href: "/admin/me-shume", label: "Kthehu" }} />
      <main className="flex flex-col gap-6 p-4">
        <p className="rounded-xl bg-lime-soft p-3.5 text-sm">
          Paneli është bërë për telefonin. Çdo ndryshim që ruani shfaqet menjëherë në faqen publike.
        </p>
        {SECTIONS.map((sec) => (
          <section key={sec.heading} className="flex flex-col gap-3">
            <div>
              <h2 className="font-display text-2xl font-bold">{sec.heading}</h2>
              <p className="text-sm text-ink-muted">{sec.intro}</p>
            </div>
            <ol className="flex flex-col gap-2">
              {sec.steps.map((st, i) => (
                <li key={st.title} className="flex gap-3 rounded-xl border bg-card p-4">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-navy text-sm font-bold text-on-navy">{i + 1}</span>
                  <div className="flex min-w-0 flex-col gap-1">
                    <p className="font-semibold">{st.title}</p>
                    <p className="text-sm text-ink-muted">{st.text}</p>
                    {st.href && (
                      <Link href={st.href} className="mt-1 text-sm font-semibold text-lime-ink underline underline-offset-4">
                        {st.cta} →
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </section>
        ))}
        <p className="text-sm text-ink-muted">Keni një pyetje që nuk është këtu? Shkruajini administratorit.</p>
      </main>
    </>
  );
}
