import { NextPage } from "next";
import { useRouter } from "next/router";
import { PiXLogoBold } from "react-icons/pi";

const SidebarLogo: NextPage = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push("/")}
      className='rounded-full h-14 w-14 p-4 flex items-center justify-center hover:bg-blue-700 hover:bg-opacity-10 cursor-pointer
  transtion'
    >
      <PiXLogoBold size={38} color='white' />
    </div>
  );
};

export default SidebarLogo;
