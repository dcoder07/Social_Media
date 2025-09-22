import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
export default function Home() {
  return (
    <>
      <Header label='Feeds' />
      <Form placeholder="What's happening" isComment={false} />
      <PostFeed/>
    </>
  );
}
