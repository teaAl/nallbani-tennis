import GeneralBanner from "@/components/common/generalBanner";
import ContactForm from "@/components/services/form";
import ServicesInfo from "@/components/services/info";
import { Check, InfoIcon } from "lucide-react";
import Link from "next/link";

const ServicesPage: React.FC = () => {
  return (
    <>
      <GeneralBanner title="Services" />

      <div className="max-w-7xl w-full mx-auto px-4 py-16 space-y-16">
        <ServicesInfo />
        <section className="">
          <div className="bg-gray-800 p-8 shadow-xl border-l-4 border-pear flex md:flex-row flex-col items-center justify-between gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-pear">
                Become a member today!
              </h2>
              <p className="text-foreground/70 text-sm">
                We want to adjust our services to your needs. Please follow the
                steps below to get in touch with us and discuss your needs.
              </p>
              <ul>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    1
                  </span>
                  <p className="text-foreground text-sm my-2">
                    Fill in the form with your details.
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    2
                  </span>
                  <p className="text-foreground text-sm my-2">
                    You'll receive all the details in a whatsapp message
                    instantly.
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    3
                  </span>
                  <p className="text-foreground text-sm my-2">
                    Discuss your needs and finalize the details.
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    4
                  </span>
                  <p className="text-foreground text-sm my-2">
                    {/* Start your tennis journey with us! */}
                    If you wish to proceed, we will create an account for you
                  </p>
                </li>
              </ul>
            </div>
            <ContactForm />
          </div>
        </section>
      </div>
    </>
  );
};

export default ServicesPage;
