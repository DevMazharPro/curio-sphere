import { typeBlog } from '@/app/Typing';
import { client } from '@/sanity/lib/client';
import { ArrowLeftIcon, MoveRight, PanelLeftDashed } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import React from 'react'
import Link from 'next/link';
import { CommentSection } from '@/components/CommentWrap';

export default async function page({ params: { slug } }: { params: { slug: string } }) {
  const query = `*[_type=='blog' && slug.current=="${slug}"]{title,body,"mainImage":mainImage.asset->url,"slug":slug.current,publishedAt,author->{name}}[0]`;

  const data: typeBlog = await client.fetch(query);

  return (
    <div className="container mx-auto p-4 font-sans">
      <div className="text-primaryColor font-bold text-lg flex items-center gap-2 ">
        <span className="text-black dark:text-white font-normal text-base flex items-center gap-2">
          <MoveRight /> Blog By:
        </span>{" "}
        {data.author.name}
      </div>
      <article>
        <h1 className="text-xl md:text-3xl font-bold text-buttonColor text-center mt-3 md:mt-6 tracking-tighter">
          {data.title}
        </h1>
        <div className="w-full h-full md:h-[400px] mx-auto my-4 md:my-8">
          <Image
            src={data.mainImage}
            alt=""
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
      <CommentSection />
    </div>
  );
}
