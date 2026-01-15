"use client";

import Lottie from "lottie-react";
import { CalendarCheck2, IdCard, User, Users } from "lucide-react";
import singlePlayerLottie from "../../../public/animations/singleplayer.json";
import { useTranslations } from "next-intl";

const ServicesInfo = () => {
    const t = useTranslations('ServicesPage');
  
  return (
    <div className="flex flex-col gap-10 justify-between items-center">
      <div className="flex flex-col gap-4 justify-around ">
        <h3
          className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max`}
        >
          {t('Section1.title')}
          {/* Be Part of Our Community */}
        </h3>
        <p className="text-foreground font-poppins font-light">
          {t('Section1.p1')}
        </p>
        <p className="text-foreground font-poppins font-light">
          {t('Section1.p2')}
        </p>
        <p className="text-foreground font-poppins font-light">
          {t('Section1.p3')}
        </p>
      </div>
      <div className="w-screen md:p-12 p-4 bg-gradient-to-r from-pear via-gray-800 to-gray-800">
        <div className="md:flex md:flex-row grid grid-cols-2 gap-4 justify-between">
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <User className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  {t('Section2.title1')}
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  {t('Section2.p1')}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <Users className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  {t('Section2.title2')}
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  {t('Section2.p2')}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat ">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <IdCard className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  {t('Section2.title3')}
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  {t('Section2.p3')}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat ">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <CalendarCheck2 className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  {t('Section2.title4')}
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  {t('Section2.p4')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicesInfo;
