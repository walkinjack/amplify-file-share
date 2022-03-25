/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getUserUpload = /* GraphQL */ `
  query GetUserUpload($id: ID!) {
    getUserUpload(id: $id) {
      id
      name
      description
      s3_upload
      file_name
      received
      createdAt
      updatedAt
      _version
      _deleted
      _lastChangedAt
      owner
    }
  }
`;
export const listUserUploads = /* GraphQL */ `
  query ListUserUploads(
    $filter: ModelUserUploadFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserUploads(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        s3_upload
        file_name
        received
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
export const syncUserUploads = /* GraphQL */ `
  query SyncUserUploads(
    $filter: ModelUserUploadFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncUserUploads(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        name
        description
        s3_upload
        file_name
        received
        createdAt
        updatedAt
        _version
        _deleted
        _lastChangedAt
        owner
      }
      nextToken
      startedAt
    }
  }
`;
