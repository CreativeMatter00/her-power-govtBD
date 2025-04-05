import BlogCard from "../meetPartneresComponents/BlogCard";

function Blog({ data }: any) {
  return (
    <section className="w-full">
      {/* cards */}
      <div className="grid  lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-8 gap-y-8 my-6">
        {data && data?.data?.map((blogPost:any) => (
          <div key={blogPost.bpost_pid} className="px-1">
            <BlogCard
              id={blogPost.bpost_pid}
              title={blogPost?.title}
              userName={blogPost?.user_pid}
              publishDate={blogPost?.cre_date}
              description={blogPost?.description}
              image={blogPost?.thumbnail_file_url}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blog;
