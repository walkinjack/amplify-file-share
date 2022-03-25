export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "userPoolGroups": {
            "uploaderGroupRole": "string",
            "adminGroupRole": "string"
        },
        "uploadwijauth": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolArn": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string"
        }
    },
    "storage": {
        "uploadwijfiles": {
            "BucketName": "string",
            "Region": "string"
        }
    },
    "api": {
        "uploadwalkinjackcom": {
            "GraphQLAPIKeyOutput": "string",
            "GraphQLAPIIdOutput": "string",
            "GraphQLAPIEndpointOutput": "string"
        }
    }
}