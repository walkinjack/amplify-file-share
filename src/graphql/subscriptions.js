/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateUserUpload = /* GraphQL */ `
  subscription OnCreateUserUpload($owner: String) {
    onCreateUserUpload(owner: $owner) {
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
export const onUpdateUserUpload = /* GraphQL */ `
  subscription OnUpdateUserUpload($owner: String) {
    onUpdateUserUpload(owner: $owner) {
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
export const onDeleteUserUpload = /* GraphQL */ `
  subscription OnDeleteUserUpload($owner: String) {
    onDeleteUserUpload(owner: $owner) {
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
