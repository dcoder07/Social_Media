import { NextPage } from "next";
import CommentItem from "./CommentItem";

interface CommentFeedProps {
  comments?: { id: string; [key: string]: unknown }[];
}

const CommentFeed: NextPage<CommentFeedProps> = ({ comments = [] }) => {
  return (
    <div>
      {comments.map((comment: { id: string; [key: string]: unknown }) => (
            <CommentItem key={comment.id} data={comment} />
          ))}
    </div>
  );
};

export default CommentFeed;
