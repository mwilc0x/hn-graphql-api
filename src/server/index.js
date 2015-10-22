import fs from 'fs';
import path from 'path';
import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser'
import cors from 'cors';

const app = express();

import {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString
} from 'graphql';

import {
  introspectionQuery,
  printSchema
} from 'graphql/utilities';

import {
  globalIdField,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  getAskStories,
  getShowStories,
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
    stories: {
      ...itemsConnection
    }
  })
});

const showStoriesType = new GraphQLObjectType({
  name: 'ShowStories',
  description: 'Show Stories list.',
  fields: () => ({
    id: globalIdField('ShowStory'),
    stories: {
      ...itemsConnection
    }
  })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
      topItems: {
        type: topItemType,
        resolve: () => getTopStories()
      },
      askStories: {
        type: askStoriesType,
        resolve: () => getAskStories()
      },
      showStories: {
        type: showStoriesType,
        resolve: () => getShowStories()
      }
    })
  })
});

export {schema};

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: false
}));

const server = app.listen(3100, () => {
  console.log('GraphQL listening at http://localhost:3100');
});
