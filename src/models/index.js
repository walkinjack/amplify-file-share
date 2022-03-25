// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { UserUpload } = initSchema(schema);

export {
  UserUpload
};