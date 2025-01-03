import { Slug } from "sanity";

export interface typeCard {
  title: string;
  author: any;
  description: string;
  slug: Slug;
  body: string;
  mainImage: any;
  publishedAt: any;
}

export interface typeBlog {
  title: string;
  author: any;
  description: string;
  slug: Slug;
  body: any;
  mainImage: any;
    publishedAt: any;
}