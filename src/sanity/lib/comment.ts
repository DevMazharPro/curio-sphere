// Example schema for comment
export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "email",
      title: "Email",
      type: "string",
    },
    {
      name: "comment",
      title: "Comment",
      type: "text",
    },
    {
      name: "blogPost",
      title: "Blog Post",
      type: "reference",
      to: [{ type: "blog" }], // Reference to your blog document
    },
  ],
};
