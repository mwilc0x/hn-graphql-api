import express from 'express';
import graphqlHTTP from 'express-graphql';

const app = express();

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  getAskStories,
  getTopStories
} from './api';

import {
  itemsConnection
} from './connections/items';

import ItemType from '../types/item';

const topItemType = new GraphQLObjectType({
  name: 'TopItem',
  description: 'Top items list.',
  fields: () => ({
    id: globalIdField('TopItem'),
    items: {
      ...itemsConnection
    }
  })
});

const askStoriesType = new GraphQLObjectType({
  name: 'AskStories',
  description: 'Ask Stories list.',
  fields: () => ({
    id: globalIdField('AskStory'),
    items: {
      ...itemsConnection
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    topItems: {
      type: topItemType,
      resolve: () => getTopStories()
    },
    askStories: {
      type: askStoriesType,
      resolve: () => getAskStories()
    }
  })
});

app.use('/graphql', graphqlHTTP({
  schema: new GraphQLSchema({query: queryType}),
  graphiql: true
}));

const server = app.listen(3100, () => {
  console.log('GraphQL listening at http://localhost:3100');
});
