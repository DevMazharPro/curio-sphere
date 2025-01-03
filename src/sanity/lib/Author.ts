export default {
    name: "author",
    title: "Author",
    type: "document",
    fields: [
        {
        name: "name",
        title: "Name",
        type: "string",
        validation: (Rule:any) =>
            Rule.required().error("Text must be at least 80 characters"),
        },
        {
        name: "bio",
        title: "Bio",
        type: "text",
        },
        {
        name: "image",
        title: "Image",
        type: "image",
        options: {
            hotspot: true,
        },
        },
    ],
}