import React from "react";
import GeneralBanner from "@/components/common/generalBanner";
import { Check, Link } from "lucide-react";

const ContactUsPage: React.FC = () => {
  return (
    <>
      <GeneralBanner title="Pricing" />

      <div className="max-w-7xl mx-auto p-4 space-y-24">
        {/* Individual Packages */}
        <section className="flex flex-col gap-8">
          <h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max">
            Coaching Packages
          </h3>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Beginner Package */}
            <div className="bg-gray-800 border border-pear/30 hover:border-pear/100 transition-all duration-300 flex flex-col">
              <div className="p-6 border-b border-pear/10">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Individual Lessons
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs bg-gray-900 w-max px-1 text-pear">
                      staring from
                    </span>
                    <span className="text-4xl font-bold text-pear">
                      22000 ALL
                    </span>
                  </div>
                  <span className="text-foreground/70 mb-1">/ month</span>
                </div>
                <p className="text-foreground/80 text-sm">
                  Perfect for those new to tennis looking to build fundamental
                  skills
                </p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      8 group lessons per month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Basic equipment provided
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Technique fundamentals
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Progress Tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">Personalised goals</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Membership included for the duration of the package
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Intermediate Package */}
            <div className="bg-gray-800 border border-pear/30 /border-2 border-pear relative flex flex-col /transform /scale-105 /shadow-[0_0_20px_rgba(197,224,99,0.2)]">
              {/* <div className="absolute top-0 right-0 bg-pear text-gray-900 px-4 py-1 text-sm font-bold">
                MOST POPULAR
              </div> */}
              <div className="p-6 border-b border-pear/10">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Group Lessons (Adults)
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs bg-gray-900 w-max px-1 text-pear">
                      staring from
                    </span>
                    <span className="text-4xl font-bold text-pear">
                      23000 ALL
                    </span>
                  </div>
                  <span className="text-foreground/70 mb-1">/ month</span>
                </div>
                <p className="text-foreground/80 text-sm">
                  For players looking to refine their technique and strategy
                </p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      8 group lessons per month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Maximum 4 players per group
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      1 private lesson per month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Advanced technique training
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Video analysis session
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Membership included for the duration of the package
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Advanced Package */}
            <div className="bg-gray-800 border border-pear/30 hover:border-pear/100 transition-all duration-300 flex flex-col">
              <div className="p-6 border-b border-pear/10">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Group Lessons (Kids)
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <div className="flex flex-col">
                    <span className="text-xs bg-gray-900 w-max px-1 text-pear">
                      staring from
                    </span>
                    <span className="text-4xl font-bold text-pear">
                      24000 ALL
                    </span>
                  </div>
                  <span className="text-foreground/70 mb-1">/ month</span>
                </div>
                <p className="text-foreground/70 text-sm">
                  Intensive training for competitive and advanced players
                </p>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      8 private lessons per month
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Personalized training plan
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Monthly progress assessment
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Competition preparation
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-5 h-5 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Membership included for the duration of the package
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Membership Options */}
        <section className="mb-16">
          <h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max">
            Membership Plans
          </h3>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Monthly Plan */}
            <div className="bg-gray-800 border border-gray-700 hover:border-pear transition-all duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Monthly
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-pear">€50</span>
                  <span className="text-gray-400 mb-1">/ month</span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Discounted court rates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      7-day advance booking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      Member events access
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 3-Month Plan */}
            <div className="bg-gray-800 border border-gray-700 hover:border-pear transition-all duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">
                  3-Month
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-pear">€135</span>
                  <span className="text-gray-400 mb-1">/ 3 months</span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      €45/month (10% savings)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      10-day advance booking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">1 free guest pass</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 6-Month Plan */}
            <div className="bg-gray-800 border border-gray-700 hover:border-pear transition-all duration-300 flex flex-col">
              <div className="p-6 border-b border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">
                  6-Month
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-pear">€240</span>
                  <span className="text-gray-400 mb-1">/ 6 months</span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      €40/month (20% savings)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      14-day advance booking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">3 free guest passes</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Annual Plan */}
            <div className="bg-gray-800 border-2 border-pear relative flex flex-col shadow-[0_0_20px_rgba(197,224,99,0.2)]">
              <div className="absolute top-0 right-0 bg-pear text-[#0F1A2A] px-4 py-1 text-sm font-bold">
                BEST VALUE
              </div>
              <div className="p-6 border-b border-gray-700">
                <h4 className="text-xl font-semibold text-white mb-2">
                  Annual
                </h4>
                <div className="flex items-end gap-1 mb-4">
                  <span className="text-3xl font-bold text-pear">€420</span>
                  <span className="text-gray-400 mb-1">/ year</span>
                </div>
              </div>

              <div className="p-6 flex-grow">
                <ul className="space-y-3 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      €35/month (30% savings)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      21-day advance booking
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">6 free guest passes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="text-pear w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span className="text-foreground">
                      1 free coaching session
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <div className="bg-gray-800 p-8 border-l-4 border-pear">
            <h3 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-pear mb-2">
                  Can I change my membership plan?
                </h4>
                <p className="text-foreground">
                  Yes, you can upgrade your membership at any time. The value of
                  your current plan will be applied to the new one.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-pear mb-2">
                  Are there family discounts available?
                </h4>
                <p className="text-foreground">
                  Yes, we offer a 10% discount for each additional family member
                  on any membership plan.
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-pear mb-2">
                  What is your cancellation policy?
                </h4>
                <p className="text-foreground">
                  Court bookings can be cancelled up to 24 hours in advance for
                  a full refund. Memberships can be frozen for up to 2 months
                  per year.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContactUsPage;
