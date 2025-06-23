const HowItWorks = () => {
  return (
    <div className="flex flex-row justify-between items-center gap-8 w-full max-w-7xl shadow-md backdrop-blur-sm bg-gray-800/50 rounded-md border-b border-b-pear/10">
      <h3 className="text-gray-900 bg-pear font-semibold md:text-2xl text-xl text-center font-poppins w-max">
        How it works
      </h3>
      <p className="text-foreground/70 font-poppins font-light flex flex-row items-center gap-2 text-sm">
        <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
          1
        </span>
        Select a day of the week and choose an available court.
      </p>
      <p className="text-foreground/70 font-poppins font-light flex flex-row items-center gap-2 text-sm">
        <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
          2
        </span>
        Add your details and indicate if you need equipment.
      </p>
      <p className="text-foreground/70 font-poppins font-light flex flex-row items-center gap-2 text-sm">
        <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
          3
        </span>
        Verify your booking ID sent to your email.
      </p>
      <p className="text-foreground/70 font-poppins font-light flex flex-row items-center gap-2 text-sm">
        <span className="text-gray-800 bg-pear rounded-full px-2 font-bold">
          4
        </span>
        Show your booking ID at the reception on the day of your booking.
      </p>
    </div>
  );
};

export default HowItWorks;
