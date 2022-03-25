import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type UserUploadMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class UserUpload {
  readonly id: string;
  readonly name?: string | null;
  readonly description?: string | null;
  readonly s3_upload: string;
  readonly file_name?: string | null;
  readonly received?: boolean | null;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<UserUpload, UserUploadMetaData>);
  static copyOf(source: UserUpload, mutator: (draft: MutableModel<UserUpload, UserUploadMetaData>) => MutableModel<UserUpload, UserUploadMetaData> | void): UserUpload;
}