import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { formatDistanceToNowStrict } from "date-fns";

import useLoginModal from "@/hooks/useLoginModal";

import Avatar from "../Avatar";
import useCurrentUser from "@/hooks/userCurrentUser";
import useUser from "@/hooks/useUser";
import useLike from "@/hooks/useLike";

interface UserRef {
  id?: string;
  userId?: string; // sometimes user id may be named userId
  name?: string;
  username?: string;
}

interface PostData {
  id?: string;
  user?: UserRef;
  createdAt?: string;
  body?: string;
  likedIds?: string[];
  comments?: unknown[];
  [key: string]: unknown;
}

interface PostItemProps {
  data: PostData;
  userId?: string;
}

const PostItem: React.FC<PostItemProps> = ({ data = {}, userId }) => {
  const router = useRouter();
  const loginModal = useLoginModal();

  const { data: currentUser } = useCurrentUser();
  const { data: fetchedUser } = useUser(userId as string);
  const postIdStr = typeof data.id === "string" ? data.id : "";
  const { hasLiked, toggleLike } = useLike({ postId: postIdStr, userId });

  const goToUser = (ev: React.MouseEvent) => {
    ev.stopPropagation();
    const targetUserId = fetchedUser?.userId ?? data.user?.id ?? data.user?.userId ?? "";
    const url = `/users/${targetUserId}`;
    router.push(url);
  };

  const goToPost = () => {
    const postTargetId = fetchedUser?.id ?? (typeof data.id === "string" ? data.id : "") ?? "";
    const url = `/posts/${postTargetId}`;
    router.push(url);
  };

  const onLike = useCallback(
    async (ev: React.MouseEvent) => {
      ev.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      toggleLike();
    },
    [loginModal, currentUser, toggleLike]
  );

  const createdAt = useMemo(() => {
    if (!data?.createdAt) {
      return null;
    }

    return formatDistanceToNowStrict(new Date(data.createdAt));
  }, [data.createdAt]);

  const LikeIcon = hasLiked ? AiFillHeart : AiOutlineHeart;
  return (
    <div
      onClick={goToPost}
      className='
        border-b-[1px] 
        border-neutral-800 
        p-5 
        cursor-pointer 
        hover:bg-neutral-900 
        transition
      '
    >
      <div className='flex flex-row items-start gap-3'>
  <Avatar userId={(fetchedUser?.id ?? data.user?.id) || ''} />
        <div>
          <div className='flex flex-row items-center gap-2'>
            <p
              onClick={goToUser}
              className='
                text-white 
                font-semibold 
                cursor-pointer 
                hover:underline
            '
            >
              {fetchedUser?.name ?? data.user?.name}
            </p>
            <span
              onClick={goToUser}
              className='
                text-neutral-500
                cursor-pointer
                hover:underline
                hidden
                md:block
            '
            >
              @{fetchedUser?.username ?? data.user?.username ?? ''}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
          <div className='flex flex-row items-center mt-3 gap-10'>
            <div
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-sky-500
            '
            >
              <AiOutlineMessage size={20} />
              <p>{data.comments?.length || 0}</p>
            </div>
            <div
              onClick={onLike}
              className='
                flex 
                flex-row 
                items-center 
                text-neutral-500 
                gap-2 
                cursor-pointer 
                transition 
                hover:text-red-500
            '
            >
              <LikeIcon size={20} color={hasLiked ? "red" : ""} />
              <p>{(data.likedIds as unknown[] | undefined)?.length ?? 0}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostItem;
