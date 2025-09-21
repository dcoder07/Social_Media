import useLoginModal from "@/hooks/useLoginModal";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { RiQuillPenLine } from "react-icons/ri";

interface Props {}

const SidebarPostButton: NextPage<Props> = ({}) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const onClick = () => {
    loginModal.onOpen();
  };

  return (
    <div>
      <div
        className='mt-6 lg:hidden rounded-full h-14 w-14 p-4 flex items-center justify-center bg-blue-700 hover:bg-opacity-80
      transition cursor-pointer'
      >
        <RiQuillPenLine size={24} color='white' />
      </div>
      <button
        onClick={onClick}
        className='mt-6 hidden lg:block px-4 py-2 rounded-full bg-blue-700 hover:bg-opacity-90
      cursor-pointer transition w-full border'
      >
        <p className='hidden lg:block text-center font-semibold text-white text-[20px]'>
          Post
        </p>
      </button>
    </div>
  );
};

export default SidebarPostButton;
