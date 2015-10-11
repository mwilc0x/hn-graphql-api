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
  getItem,
  getTopItems
} from './data';

const itemType = new GraphQLObjectType({
  name: 'Item',
  description: 'An item',
  fields: () => ({
    id: globalIdField('Item'),
    name: {
      type: GraphQLString,
      description: 'The name of the item.',
    }
  })
});

function resolveItemConnection(topItem, args) {
  return new Promise((resolve, reject) => {
    resolve(topItem.items.map(id => getItem(id)));
  });
}

const {connectionType: itemConnection} =
  connectionDefinitions({name: 'Item', nodeType: itemType});

const topItemType = new GraphQLObjectType({
  name: 'TopItem',
  description: 'Top items list.',
  fields: () => ({
    id: globalIdField('TopItem'),
    items: {
      type: itemConnection,
      description: 'The top items.',
      args: connectionArgs,
      resolve: (topItem, args) => connectionFromPromisedArray(
        resolveItemConnection(topItem, args),
        args
      )
    }
  })
});

const queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    topItems: {
      type: topItemType,
      resolve: () => getTopItems(),
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
