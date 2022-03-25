/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createUserUpload = /* GraphQL */ `
  mutation CreateUserUpload(
    $input: CreateUserUploadInput!
    $condition: ModelUserUploadConditionInput
  ) {
    createUserUpload(input: $input, condition: $condition) {
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
export const updateUserUpload = /* GraphQL */ `
  mutation UpdateUserUpload(
    $input: UpdateUserUploadInput!
    $condition: ModelUserUploadConditionInput
  ) {
    updateUserUpload(input: $input, condition: $condition) {
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
export const deleteUserUpload = /* GraphQL */ `
  mutation DeleteUserUpload(
    $input: DeleteUserUploadInput!
    $condition: ModelUserUploadConditionInput
  ) {
    deleteUserUpload(input: $input, condition: $condition) {
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
