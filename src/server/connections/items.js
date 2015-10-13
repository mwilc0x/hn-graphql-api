import {
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
  if (args.first) {
    fragment = items.slice(0, args.first);
  } else {
    fragment = items;
  }
  return Promise.all(fragment.map(id => getItem(id)));
}

const {connectionType: itemConnection} =
  connectionDefinitions({name: `Item`, nodeType: ItemType});

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
  itemsConnection
};
