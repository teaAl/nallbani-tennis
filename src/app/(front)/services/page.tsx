"use client";
import GeneralBanner from "@/components/common/generalBanner";
import ContactForm from "@/components/services/form";
import ServicesInfo from "@/components/services/info";
import { Check, InfoIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useLayoutEffect } from "react";
import { scrollIntoView } from "@/utils/scrollToView";
import { useTranslations } from "next-intl";

const ServicesPage: React.FC = () => {
  const t = useTranslations('ServicesPage');
  
  return (
    <>
      <GeneralBanner title={t('title')} />

      <div className="max-w-7xl w-full mx-auto px-4 py-16 space-y-16">
        <ServicesInfo />
        <section className="">
          <div className="bg-gray-800 p-8 shadow-xl border-l-4 border-pear flex md:flex-row flex-col items-center justify-between gap-10">
            <div className="flex flex-col gap-4">
              <h2 className="text-3xl font-bold text-pear">
                {t('Section3.title')}
              </h2>
              <p className="text-foreground/70 text-sm">
                {t('Section3.p1')}
              </p>
              <ul>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    1
                  </span>
                  <p className="text-foreground text-sm my-2">
                    {t('Section3.form1')}
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    2
                  </span>
                  <p className="text-foreground text-sm my-2">
                    {t('Section3.form2')}
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    3
                  </span>
                  <p className="text-foreground text-sm my-2">
                    {t('Section3.form3')}
                  </p>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
                    4
                  </span>
                  <p className="text-foreground text-sm my-2">
                    {/* Start your tennis journey with us! */}
                    {t('Section3.form4')}
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
