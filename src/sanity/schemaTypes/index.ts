import { type SchemaTypeDefinition } from 'sanity'
import Blogs from '../lib/Blogs'
import Author from '../lib/Author'
import Category from '../lib/Category'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [Blogs, Author, Category],
}
