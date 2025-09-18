import { NextPage } from "next";
import { useRouter } from "next/router";
import { RiQuillPenLine } from "react-icons/ri";

interface Props {}

const SidebarTweetButton: NextPage<Props> = ({}) => {
  const router = useRouter();
  return (
    <div
      onClick={() => {
        router.push("/");
      }}
    >
      <div
        className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-blue-700 hover:bg-opacity-80
      transition cursor-pointer'
      >
        <RiQuillPenLine size={24} color='white' />
      </div>
      <div
        className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-blue-700 hover:bg-opacity-90
      cursor-pointer transition'
      >
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
          Post
        </p>
      </div>
    </div>
  );
};

export default SidebarTweetButton;
