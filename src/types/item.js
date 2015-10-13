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
  usersConnection
} from '../server/connections/user';

var ItemType = new GraphQLObjectType({
  name: `Item`,
  fields: () => ({
    id: globalIdField(`Item`),
    by: {
      ...usersConnection
    },
    deleted: {
      type: GraphQLBoolean,
      description: `true if the item is deleted.`
    },
    type: {
      type: GraphQLString,
      description: `The type of item. One of "job", "story", "comment", "poll",
                    or "pollopt".`
    },
    time: {
      type: GraphQLInt,
      description: `Creation date of the item, in Unix Time.`
    },
    text: {
      type: GraphQLString,
      description: `The comment, story or poll text. HTML.`
    },
    dead: {
      type: GraphQLBoolean,
      description: `true if the item is dead.`
    },
    parent: {
      type: GraphQLString,
      description: `The item's parent. For comments, either another comment or
                    the relevant story. For pollopts, the relevant poll.`
    },
    kids: {
      type: new GraphQLList(GraphQLString),
      description: `The ids of the 's comments, in ranked display order.`
    },
    url: {
      type: GraphQLString,
      description: `The URL of the story.`
    },
    score: {
      type: GraphQLString,
      description: `The story's score, or the votes for a pollopt.`
    },
    title: {
      type: GraphQLString,
      description: `The title of the story, poll or job.`
    },
    parts: {
      type: new GraphQLList(GraphQLString),
      description: `A list of related pollopts, in display order.`
    },
    descendants: {
      type: GraphQLInt,
      description: `In the case of stories or polls, the total comment count.`
    }
  })
});

export default ItemType;
