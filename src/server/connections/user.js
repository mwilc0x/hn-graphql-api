import {
  connectionFromPromisedArray,
  connectionArgs,
  connectionDefinitions
} from 'graphql-relay';

import {
  getUser
} from '../api';

import UserType from '../../types/user';

function resolveUserConnection(item, args) {
  return new Promise((resolve, reject) => {
    resolve([getUser(item.by)]);
  });
}

const {connectionType: userConnection} =
  connectionDefinitions({name: 'User', nodeType: UserType});

const usersConnection = {
  type: userConnection,
  description: 'The user.',
  args: connectionArgs,
  resolve: (item, args) => connectionFromPromisedArray(
    resolveUserConnection(item, args),
    args
  )
};

export {
  usersConnection
};
