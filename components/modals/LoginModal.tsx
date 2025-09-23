import useLoginModal from "@/hooks/useLoginModal";
import { NextPage } from "next";
import { useCallback, useState } from "react";
import Input from "../Input";
import InputCard from "../InputCard";
import useRegisterModal from "@/hooks/useRegisterModal";
import { signIn } from "next-auth/react";
import useCurrentUser from "@/hooks/userCurrentUser";

const LoginModal: NextPage = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  const { mutate } = useCurrentUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onToggle = useCallback(() => {
    if (isLoading) {
      return;
    }
    loginModal.onClose();
    registerModal.onOpen();
  }, [isLoading, registerModal, loginModal]);

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      await mutate("/api/current");
      setEmail("");
      setPassword("");
      loginModal.onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const bodyContent = (
    <div className='flex flex-col gap-4'>
      <Input
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        disabled={isLoading}
      />
      <Input
        placeholder='Password'
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        disabled={isLoading}
      />
    </div>
  );

  const footerContent = (
    <div className='text-neutral-400 text-center mt-4'>
      <p>
        Using for the first time?
        <span
          onClick={onToggle}
          className='text-white cursor-pointer hover:underline ml-2'
        >
          Create an account
        </span>
      </p>
    </div>
  );

  return (
    <InputCard
      disabled={isLoading}
      isOpen={loginModal.isOpen}
      title='Login'
      actionLabel='Sign in'
      onClose={loginModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
