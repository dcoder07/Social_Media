import useLoginModal from "@/hooks/useLoginModal";
import useCurrentUser from "@/hooks/userCurrentUser";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  auth?: boolean;
  onCLick?: () => void;
}

const SidebarItem: NextPage<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onCLick,
  auth,
}) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  
  const handleClick = useCallback(() => {
    if (onCLick) {
      return onCLick();
    }
    if (auth && !currentUser) {
      loginModal.onOpen();
    }
    if (href) {
      router.push(href);
    }
  }, [router, onCLick, href]);
  return (
    <div
      onClick={handleClick}
      className='flex flex-row items-center cursor-pointer'
    >
      <div
        className='relative rounded-full h-14 w-14 flex items-center justify-center p-4 hover:bg-slate-300 hover:bg-opacity-10 
  cursor-pointer lg:hidden'
      >
        <Icon size={20} color='white' />
      </div>
      <div className='relative hidden w-full lg:flex items-center gap-4 p-4 rounded-full hover:bg-slate-900 hover:bg-opacity-10 '>
        <Icon size={24} color='white' />
        <p className='text-white text-xl hidden lg:block'>{label}</p>
      </div>
    </div>
  );
};

export default SidebarItem;
