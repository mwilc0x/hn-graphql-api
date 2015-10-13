import {
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  getItem
} from '../api';

import ItemType from '../../types/item';

function resolveSubmittedConnection(user, args) {
  let fragment;
  if (args.first) {
    fragment = user.submitted.slice(0, args.first);
  } else {
    fragment = user.submitted;
  }
  return Promise.all(fragment.map(id => getItem(id)));
}

const {connectionType: submittedConnection} =
  connectionDefinitions({name: `Item`, nodeType: ItemType});

const submissionsConnection = {
  type: submittedConnection,
  description: `A list of item id's.`,
  args: connectionArgs,
  resolve: (user, args) => connectionFromPromisedArray(
    resolveSubmittedConnection(user, args),
    args
  )
};

export {
  submissionsConnection
};
