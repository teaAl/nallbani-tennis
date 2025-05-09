"use client";

import Lottie from "lottie-react";
import { CalendarCheck2, IdCard, User, Users } from "lucide-react";
import singlePlayerLottie from "../../../public/animations/singleplayer.json";

const ServicesInfo = () => {
  return (
    <div className="flex flex-col gap-10 justify-between items-center">
      <div className="flex flex-col gap-4 justify-around ">
        <h3
          className={`text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max`}
        >
          A Variety of Services
          {/* Be Part of Our Community */}
        </h3>
        <p className="text-foreground font-poppins font-light">
          At Nallbani Tennis, we believe in providing a comprehensive experience
          for our members. Our services are designed to cater to players of all
          levels, from beginners to advanced. Our coaching programs are designed
          to be fun and engaging, ensuring that you not only improve your skills
          but also enjoy the process.
        </p>
        <p className="text-foreground font-poppins font-light">
          In addition to coaching, we offer a range of membership options to
          suit your needs. We also organize regular events and tournaments,
          giving you the opportunity to showcase your skills and compete with
          other players. These events are a great way to meet new people, make
          friends, and enjoy the social aspect of the game.
        </p>
        <p className="text-foreground font-poppins font-light">
          At Nallbani Tennis, we are committed to creating a welcoming and
          inclusive community for all players. We believe that tennis is not
          just a sport, but a way to connect with others and build lasting
          relationships.
        </p>
      </div>
      <div className="w-screen md:p-12 p-4 bg-gradient-to-r from-pear via-gray-800 to-gray-800">
        <div className="md:flex md:flex-row grid grid-cols-2 gap-4 justify-between">
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <User className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  Individual Lessons
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatibus, quibusdam, voluptates, quis, quas.
                  Quisquam
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <Users className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  Group Lessons
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatibus, quibusdam, voluptates, quis, quas.
                  Quisquam
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat ">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <IdCard className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  Membership Options
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatibus, quibusdam, voluptates, quis, quas.
                  Quisquam
                </p>
              </div>
            </div>
          </div>
          <div className="bg-[linear-gradient(to_right,rgba(16,24,40,0.7),rgba(16,24,40,1)),url('/images/racquetpattern.jpg')] bg-cover bg-fixed bg-no-repeat ">
            <div className="backdrop-blur-lg p-4 gap-4 flex flex-col">
              <div className="flex flex-row gap-4 justify-between items-center border-b border-foreground/10 pb-4">
                <CalendarCheck2 className="text-pear w-7 h-7" />
                <p className="text-pear font-poppins font-light">
                  Court Reservations
                </p>
              </div>
              <div>
                <p className="text-foreground/70 font-poppins font-light text-sm text-right">
                  lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Quisquam voluptatibus, quibusdam, voluptates, quis, quas.
                  Quisquam
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
