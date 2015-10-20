import {
  GraphQLList
} from 'graphql';

import {
  connectionFromArray,
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  getItem
} from '../api';

import ItemType from '../../types/item';

function resolveItemConnection(items, args) {
  let fragment;
  let list;

  if (items.submitted) {
    list = items.submitted;
  } else if (items.kids) {
    list = items.kids;
  } else {
    list = items;
  }

  if (args.first) {
    fragment = list.slice(0, args.first);
  } else {
    fragment = list;
  }
  return Promise.all(fragment.map(id => getItem(id)));
}

const {connectionType: itemConnection} = connectionDefinitions({
  name: `Item`,
  nodeType: ItemType,
  connectionFields: () => ({
    list: {
      type: new GraphQLList(ItemType),
      resolve: conn => conn.edges.map(edge => edge.node),
      description: 'testing!'
    }
  })
});

const itemsConnection = {
  type: itemConnection,
  description: `A list of item id's.`,
  args: connectionArgs,
  resolve: (items, args) => connectionFromPromisedArray(
    resolveItemConnection(items, args),
    args
  )
};

export {
  itemConnection,
  itemsConnection
};
