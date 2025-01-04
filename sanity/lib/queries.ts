import { defineQuery } from 'next-sanity';

export const RECIPES_QUERY =
	defineQuery(`*[_type == "recipes" && defined(slug.current) && (!defined($search) || title match $search || category[] match $search || author->name match $search)] | order(_createdAt desc) {
  _id,
  title,
  slug,
  _createdAt,
  author -> {
    _id,
    name,
    image,
    bio
  },
  description,
  category,
     media[] {
      _type,
      asset -> {
        _id,
        url
      },
      hotspot
    },
  ingredients[] {
    quantity,
    product
  },
  steps[] {
    instruction,
    time
  },
}`);

export const RECIPE_BY_ID_QUERY = defineQuery(`
  *[_type == "recipes" && _id == $id][0]{
    _id, 
    title, 
    slug,
    _createdAt,
    author -> {
      _id, 
      name, 
      username, 
      image, 
      bio
    }, 
    description,
    category,
    media[] {
      _type,
      asset -> {
        _id,
        url
      },
      hotspot
    },
  ingredients[] {
    quantity,
    product
  },
  steps[] {
    instruction,
    time
  },
  }
`);

export const AUTHOR_BY_GITHUB_ID_QUERY = defineQuery(`
  *[_type == "author" && id == $id][0]{
      _id,
      id,
      name,
      username,
      email,
      image,
      bio
  }
  `);

export const AUTHOR_BY_ID_QUERY = defineQuery(`
    *[_type == "author" && _id == $id][0]{
        _id,
        id,
        name,
        username,
        email,
        image,
        bio
    }
    `);

export const RECIPES_BY_AUTHOR_QUERY =
	defineQuery(`*[_type == "recipe" && author._ref == $id] | order(_createdAt desc) {
  _id, 
  title, 
  slug,
  _createdAt,
  author -> {
    _id, name, image, bio
  }, 
  views,
  description,
  category,
  image,
}`);
