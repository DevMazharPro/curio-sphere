import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";

export const revalidate = 5;


const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

export async function POST(request: Request) {
  const { name, email, comment, _id } = await request.json();

  const newComment = {
    _type: "comment",
    name,
    email,
    comment,
    blogPost: {
      _type: "reference",
      _ref: _id,
    },
  };

  try {
    // Create the comment in Sanity
    const result = await client.create(newComment);
    console.log("Comment saved:", result);

    return NextResponse.json(
      { message: "Comment added successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving comment:", error);
    return NextResponse.json(
      { message: "Failed to add comment" },
      { status: 500 }
    );
  }
}
