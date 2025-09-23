import { NextPage } from "next";
import { PiXLogoBold } from "react-icons/pi";
import useNotifications from "@/hooks/useNotifications";
import { useEffect } from "react";
import useCurrentUser from "@/hooks/userCurrentUser";

const NotificationsFeed: NextPage = () => {
  const { data: currentUser, mutate: mutateCurrentUser } = useCurrentUser();
  const { data: fetchedNotifications = [] } = useNotifications(currentUser?.id);

  useEffect(() => {
    mutateCurrentUser();
  }, [mutateCurrentUser]);

  if (fetchedNotifications.length === 0) {
    return (
      <div className='text-neutral-600 text-center p-6 text-xl'>
        No notifications
      </div>
    );
  }

  type Notification = { id: string; body: string };

  return (
    <div className='flex flex-col'>
      {fetchedNotifications.map((notification: Notification) => (
        <div
          key={notification.id}
          className='flex flex-row items-center p-6 gap-4 border-b-[1px] border-neutral-800'
        >
          <PiXLogoBold color='white' size={32} />
          <p className='text-white'>{notification.body}</p>
        </div>
      ))}
    </div>
  );
};

export default NotificationsFeed;
