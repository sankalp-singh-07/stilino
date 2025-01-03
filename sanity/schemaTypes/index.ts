import { type SchemaTypeDefinition } from 'sanity';
import { author } from './author';
import { recipe } from './recipe';
import { recipes } from './recipes';

export const schema: { types: SchemaTypeDefinition[] } = {
	types: [author, recipe, recipes],
};
