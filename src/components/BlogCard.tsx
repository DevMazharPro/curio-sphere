import React from "react";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { typeCard } from "@/app/Typing";

export default async function BlogCard() {
  const query = `*[_type == "blog"] | order(_updatedAt desc){
    author->{name,"authorImage": image.asset->url},
    description,"slug":slug.current,"mainImage":mainImage.asset->url,
    title,publishedAt
  }`;
  const data = await client.fetch(query);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 md:mt-10">
      {data.map((item: typeCard) => (
        <Card
          className="w-full h-[420px] overflow-hidden flex flex-col"
          key={item.slug.current}
        >
          <div className="w-full h-[200px] p-2">
            <Image
              src={item.mainImage}
              alt="image"
              width={200}
              height={200}
              priority
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex flex-col flex-grow p-4 justify-between">
            <div>
              <h2 className="text-xl font-bold text-primaryColor">
                {item.title}
              </h2>
              <p className="text-gray-500 text-sm line-clamp-3">
                {item.description.length > 100
                  ? item.description.substring(0, 100) + "..."
                  : item.description}
              </p>
              <Link
                href={`/blog/${item.slug}`}
                className="text-buttonColor mt-2 underline block"
              >
                Read More
              </Link>
            </div>
            <div className="flex justify-between items-center mt-4">
              <p className="text-gray-400 text-sm">{item.author.name}</p>
              <Image
                src={item.author.authorImage}
                alt="author image"
                width={30}
                height={30}
                className="rounded-full object-cover"
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
