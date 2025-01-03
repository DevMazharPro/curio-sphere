const categorySchema = {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    {
      name: "name",
      title: "Name of the Category",
      type: "string",
      validation: (Rule: any) =>
        Rule.required().max(80).error("Text must be at least 80 characters"),
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
    },
    {
      name: "description",
      title: "Description",
      type: "text",
    },
  ],
};

export default categorySchema;
