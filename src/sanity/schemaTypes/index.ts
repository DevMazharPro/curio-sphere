import { type SchemaTypeDefinition } from 'sanity'
import Blogs from '../lib/Blogs'
import Author from '../lib/Author'
import Category from '../lib/Category'
import commentsSchema from '../lib/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Blogs, Author, Category, commentsSchema],
}
