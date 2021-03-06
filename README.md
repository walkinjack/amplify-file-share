---
title: Creating A Photo Sharing App With AWS Amplify
date: "2022-03-27T11:01:03.284Z"
description: "A tutorial using Amazon Web Services Amplify project to create a photo sharing application"
author: "Sam Williams"
headerImage: ./amplify-logo.jpg
thumbnail: ./amplify-logo.jpg
isFeatured: true
---
# Simple AWS Amplify Project to Share Files
## Requirements

1. An Amazon Web Services Account, you can set one up for free at [https://aws.amazon.com/free/](https://aws.amazon.com/free/)
2. NodeJS Installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
3. AWS Command Line Interface Installed [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)
4. Git installed [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Install Node Packages
Runn the following command in your terminal

```shell
npm install -g gatsby-cli @aws-amplify/cli
```

## Amazon Web Services Credentials

You will need IAM credentials to access your current or new amazon account using the AWS CLI (AWS Command Line Interface). 

1. Go to the [Cloud Formation Create Stack Page](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template)
2. Select Template is Ready and Upload a template file
3. Upload the AWS_NEW_USER.yml file located in the git repository we cloned, and continue with the defaults through each step until the template starts to create/template
4. Once the template finishes click on the Output Tabs and copy the AccessKey and SecretKey and save these for later


## Cloning the Git Repository & Setup Amplify
1. open your command prompt/terminal
2. clone the repository

```shell
git clone https://github.com/walkinjack/amplify-file-share.git

cd amplify-file-share

npm install --legacy-peer-deps

amplify init

```

Go Through the prompts:

```shell
? Enter a name for the project (amplifyfileshare)

The following configuration will be applied:

Project information
| Name: amplifyfileshare
| Environment: dev
| Default editor: Visual Studio Code
| App type: javascript
| Javascript framework: react
| Source Directory Path: src
| Distribution Directory Path: build
| Build Command: npm.cmd run-script build
| Start Command: npm.cmd run-script start

Initialize the project with the above configuration? (Y/n) n

? Which setting do you want to configure? Project information
? Enter a name for the project amplifyfileshare
? Choose your default editor: None #pick one that you have or choose None
? Choose the type of app that you're building javascript
Please tell us about your project
? What javascript framework are you using: react
? Source Directory Path:  src
? Distribution Directory Path: public #this is important, make sure you change it to public!
? Build Command:  npm.cmd run-script build
? Start Command: npm.cmd run-script start

? Select the authentication method you want to use:
AWS profile
AWS access keys <--- Select this one and press enter

? accessKeyId: (hidden) 

? Select the authentication method you want to use: AWS access keys
? accessKeyId:  ********************                            #enter the AccessKey from Output tab of the Amazon Cloud Formation Template that we ran earlier
? secretAccessKey:  ****************************************    #enter the SecretKey from Output tab of the Amazon Cloud Formation Template that we ran earlier
? region: us-east-1 #select us-east-1

```

### Now your initial Amplify Project has been set up
Continue running commands to finish setting up the project:

#### Add Auth (for user access)

```shell
amplify add auth

 Do you want to use the default authentication and security configuration? (Use arrow keys)
> Default configuration #select this

 Warning: you will not be able to edit these selections.
 How do you want users to be able to sign in? (Use arrow keys)
  Username
> Email  # I like using the email, however you can choose which option you want users to sign in with.

 Do you want to configure advanced settings? (Use arrow keys)
> No, I am done.
  Yes, I want to make some additional changes.


amplify update auth

 What do you want to do?
  Apply default configuration with Social Provider (Federation)
  Walkthrough all the auth configurations
> Create or update Cognito user pool groups  # we'll make our admin group

 What do you want to do? Create or update Cognito user pool groups
? Provide a name for your user pool group: admin
? Do you want to add another User Pool Group (y/N) n

```

#### Add Storage

```shell
amplify add storage
? Select from one of the below mentioned services: (Use arrow keys)
> Content (Images, audio, video, etc.) # this one
  NoSQL Database
  
? Provide a friendly name for your resource that will be used to label this category in the project: ?? amplifyfilestorage
? Provide bucket name: ?? #use the default or make up a name :)

? Restrict access by? ...  (Use arrow keys or type to filter)
  Auth/Guest Users
  Individual Groups
??? Both    # we want to allow users and groups access
  Learn more

Who should have access: ...  (Use arrow keys or type to filter)
??? Auth users only  

? What kind of access do you want for Authenticated users? ...  (Use arrow keys or type to filter)
 ??? create/update   #hit spacebar next to create/update to select
?????? read            #hit spacebar next to read to select
 ??? delete
 
 ? Select groups: ...  (Use arrow keys or type to filter)
?????? admin  #hit spacebar to select admin and hit enter

? What kind of access do you want for admin users? ...  (Use arrow keys or type to filter)
 ??? create/update   #hit spacebar to allow create/update
 ??? read            #hit spacebar to allow read
?????? delete          #hit spacebar to allow delete

? Do you want to add a Lambda Trigger for your S3 Bucket? (y/N) ?? N #no we don't need this
```

#### Add the API

```shell
amplify add api
? Select from one of the below mentioned services: (Use arrow keys)
> GraphQL # this one


#Push your up arrow key to customize the API

? Here is the GraphQL API that we will create. Select a setting to edit or continue
  Name: amplifyfilestorage
> Authorization modes: API key (default, expiration time: 7 days from now)  #chage this by moving arrow keys to this line and hitting enter:


? Choose the default authorization type for the API Amazon Cognito User Pool
Use a Cognito user pool configured as a part of this project.
? Configure additional auth types? (y/N) n


? Here is the GraphQL API that we will create. Select a setting to edit or continue
  Name: amplifyfilestorage
  Authorization modes: Amazon Cognito User Pool (default)
> Conflict detection (required for DataStore): Disabled #chage this by moving arrow keys to this line and hitting enter:
 
? Here is the GraphQL API that we will create. Select a setting to edit or continue Conflict detection (required for Dat
aStore): Disabled
? Enable conflict detection? (Y/n) y

? Select the default resolution strategy (Use arrow keys)
> Auto Merge


? Here is the GraphQL API that we will create. Select a setting to edit or continue (Use arrow keys)
  Name: amplifyfilestorage
  Authorization modes: Amazon Cognito User Pool (default)
  Conflict detection (required for DataStore): Enabled
  Conflict resolution strategy: Auto Merge
> Continue

? Choose a schema template:
  Single object with fields (e.g., ???Todo??? with ID, name, description)
  One-to-many relationship (e.g., ???Blogs??? with ???Posts??? and ???Comments???)
  Objects with fine-grained access control (e.g., a project management app with owner-based authorization)
> Blank Schema  #move down and select blank

? Do you want to edit the schema now? (Y/n) ?? Y

# If the file doesn't open you can find it at ./amplify/backend/api/amplifyfileshare/schema.graphql
```
```graphql
# Open the file ./amplify/backend/api/amplifyfileshare/schema.graphql and replace the content with this:


type UserUpload @model @auth(rules: [
  { allow: public, operations: [read]}
  { allow: owner }
  { allow: groups, groups: ["admin"]}
]){
  id: ID!
  name: String
  description: String
  s3_upload: String!
  file_name: String
  received: Boolean
}
```


#### Create Everything in the Cloud
Now everything has been set up on your computer, and you can now build it in the cloud by running the following:

```shell
amplify push

? Are you sure you want to continue? Yes
API key configuration
? Enter a description for the API key: amplifyfileshare
? After how many days from now the API key should expire (1-365): 365

? Do you want to generate code for your newly created GraphQL API (Y/n) y

? Choose the code generation language target (Use arrow keys)
> javascript #this one :)
  typescript
  flow
  
? Enter the file name pattern of graphql queries, mutations and subscriptions (src\graphql\**\*.js) #hit enter and use the default src\graphql\**\*.js
  
? Do you want to generate/update all possible GraphQL operations - queries, mutations and subscriptions (Y/n) y

? Enter maximum statement depth [increase from default if your schema is deeply nested] (2)

```

#### Add Hosting
This step gives you a website that you can share with others

```shell
amplify add hosting

? Select the plugin module to execute (Use arrow keys)
> Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)  #if you are new to all this, this is a little more advanced and worth learning, it saves time in the future

? Choose a type
  Continuous deployment (Git-based deployments)
> Manual deployment  #manual for now
  Learn more
  
amplify publish  

```

#### Finished
Now, if you followed all the steps, after running ```amplify publish``` a website address will show up in the terminal:

```
??? Zipping artifacts completed.
??? Deployment complete!
https://dev.randomnumbersandletters.amplifyapp.com
```

Go to the site, create an account, and try it out!!

#### Final Step
After making an account on your website, you'll want to add it to the admin group so you can fully use the site;

1. Go to Cognito User Pools in Amazon [https://us-east-1.console.aws.amazon.com/cognito/users/?region=us-east-1](https://us-east-1.console.aws.amazon.com/cognito/users/?region=us-east-1)
2. Click on your userpool, it should contain amplifyfileshare in the name
3. Click on Users and Groups in the left hand menu
4. Click your username
5. Click the Add to Group Button
6. Select admin, and then add to group

## All Done
You can look through the code and play around to change it to meet your needs. 

To run the code on your computer to see how your code changes work, you can run

```shell
gatsby develop
```

If you want to deploy your changes to your public website, you can run

```shell
amplify publish
```