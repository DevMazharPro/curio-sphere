import { typeBlog } from "@/app/Typing";
import { client } from "@/sanity/lib/client";
import { ArrowLeftIcon, MoveRight } from "lucide-react";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import WriteComment from "@/components/writeComment";

export const revalidate = 5;

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { slug } = params;
  const commentsToShow = parseInt(searchParams.commentsToShow as string) || 5;

  const query = `*[_type=='blog' && slug.current==$slug]{
    _id,
    title,
    body,
    "mainImage":mainImage.asset->url,
    "slug":slug.current,
    publishedAt,
    author->{name},
    "comments": *[_type == "comment" && references(^._id)] | order(_createdAt asc) {
      _id,
      name,
      comment,
      _createdAt
    }
  }[0]`;

  const data: typeBlog = await client.fetch(query, { slug });

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="text-primaryColor font-bold text-lg flex items-center gap-2 ">
        <span className="text-black dark:text-white font-normal text-base flex items-center gap-2">
          <MoveRight /> Blog By:
        </span>
        {data.author.name}
      </div>
      {/* Blog content */}
      <article>
        <h1 className="text-xl md:text-3xl font-bold text-buttonColor text-center mt-3 md:mt-6 tracking-tighter">
          {data.title}
        </h1>
        <div className="w-full h-full md:h-[400px] mx-auto my-4 md:my-8">
          <Image
            src={data.mainImage}
            alt={data.title}
            width={400}
            height={400}
            priority
            className="w-full h-full object-cover px-10"
          />
        </div>
        <div className="prose-headings:text-primaryColor prose-headings:font-bold prose-headings:text-lg md:prose-headings:text-xl prose-headings:py-2">
          <PortableText value={data.body} />
        </div>
      </article>
      <Link href="/">
        <div className="flex items-center justify-end mt-4 text-xl font-bold text-primaryColor gap-2">
          <div>
            <ArrowLeftIcon />
          </div>
          <div>
            <h2>Back to Homepage</h2>
          </div>
        </div>
      </Link>
      {/* Comment form */}
      <WriteComment _id={data._id} />
      {/* Displaying the comments */}
      <div className="mt-6">
        <h2 className="text-xl font-bold text-primaryColor">Comments:</h2>
        {data.comments.length > 0 ? (
          <ul className="mt-4">
            {data.comments.slice(0, commentsToShow).map((comment: any) => (
              <li key={comment._id} className="border-b py-4">
                <strong>{comment.name}</strong>:{" "}
                <p className="mt-2 text-gray-700">{comment.comment}</p>
                <p className="text-sm text-gray-500">
                  Posted on: {new Date(comment._createdAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet. Be the first to comment!</p>
        )}
        {commentsToShow < data.comments.length && (
          <Link
            href={`?commentsToShow=${commentsToShow + 5}`}
            className="mt-4 text-primaryColor font-bold"
          >
            Read More
          </Link>
        )}
      </div>
    </div>
  );
}
