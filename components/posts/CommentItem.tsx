import { formatDistanceToNowStrict } from "date-fns";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Avatar from "../Avatar";

interface CommentItemProps {
  data: { id: string; user?: { id?: string; name?: string; username?: string }; createdAt?: string; body?: string; userId?: string; [key: string]: unknown };
}

const CommentItem: NextPage<CommentItemProps> = ({ data }) => {
  const router = useRouter();

  const goToUser = (event: React.MouseEvent) => {
    event.stopPropagation();
    router.push(`/users/${data.userId}`);
  };

  const createdAt = () => {
    if (!data?.createdAt) return null;
    return formatDistanceToNowStrict(new Date(data.createdAt));
  };

  return (
    <div
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
  <Avatar userId={data.user?.id || ''} />
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
              {data.user?.name}
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
              @{data.user?.username}
            </span>
            <span className='text-neutral-500 text-sm'>{createdAt()}</span>
          </div>
          <div className='text-white mt-1'>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default CommentItem;
