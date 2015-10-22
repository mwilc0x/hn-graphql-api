import fs from 'fs';
import path from 'path';
import cors from 'cors';

import {
  graphql
} from 'graphql';

import {
  introspectionQuery,
  printSchema
} from 'graphql/utilities';

import {schema} from './server/index';

async () => {
  const result = await graphql(schema, introspectionQuery);
  if (result.errors) {
    throw new Error(result.errors);
  }
  fs.writeFileSync(
    path.join(__dirname, '../data/schema.json'),
    JSON.stringify(result, null, 2)
  );
}();
