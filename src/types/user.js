import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLList,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

import {
  globalIdField
} from 'graphql-relay';

import {
  itemsConnection
} from '../server/connections/items';

var UserType = new GraphQLObjectType({
  name: `User`,
  fields: () => ({
    id: globalIdField(`User`),
    about: {
      type: GraphQLString,
      description: `The user's optional self-description. HTML.`
    },
    created: {
      type: GraphQLInt,
      description: `Creation date of the user, in Unix Time.`
    },
    karma: {
      type: GraphQLInt,
      description: `The user's karma.`
    },
    delay: {
      type: GraphQLInt,
      description: `Delay in minutes between a comment's creation and its
                    visibility to other users.`
    }
  })
});

export default UserType;
