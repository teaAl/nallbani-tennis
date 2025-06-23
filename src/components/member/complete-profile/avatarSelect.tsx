import Image from "next/image";
import avatar1 from "../../../../public/images/avatars/avatar1.jpg";
import avatar2 from "../../../../public/images/avatars/avatar2.jpg";
import avatar3 from "../../../../public/images/avatars/avatar3.jpg";
import avatar4 from "../../../../public/images/avatars/avatar4.jpg";
import { UserNT } from "@/interfaces/usernt.interface";

const AvatarSelect = ({
  user,
  preview,
  setPreview,
}: {
  user: UserNT;
  preview: string | null;
  setPreview: (preview: string) => void;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col justify-around gap-4 items-center">
        <div className="flex flex-row justify-around gap-4">
          <button
            className={`${
              preview && preview === "avatar1" ? "ring-2 ring-pear" : "ring-0"
            } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-all duration-200`}
            onClick={() => setPreview("avatar1")}
          >
            <Image src={avatar1} alt="Avatar1" />
          </button>
          <button
            className={`${
              preview && preview === "avatar2" ? "ring-2 ring-pear" : "ring-0"
            } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
            onClick={() => setPreview("avatar2")}
          >
            <Image src={avatar2} alt="Avatar2" />
          </button>
        </div>
        <div className="flex flex-row justify-around gap-4">
          <button
            className={`${
              preview && preview === "avatar3" ? "ring-2 ring-pear" : "ring-0"
            } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
            onClick={() => setPreview("avatar3")}
          >
            <Image src={avatar3} alt="Avatar3" />
          </button>
          <button
            className={`${
              preview && preview === "avatar4" ? "ring-2 ring-pear" : "ring-0"
            } focus:ring-2 focus:ring-pear cursor-pointer hover:scale-105 transition-transform duration-200`}
            onClick={() => setPreview("avatar4")}
          >
            <Image src={avatar4} alt="Avatar4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvatarSelect;
