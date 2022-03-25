# Simple AWS Amplify Project to Share Files
## Requirements

1. An Amazon Web Services Account, you can set one up for free at [https://aws.amazon.com/free/](https://aws.amazon.com/free/)
2. NodeJS Installed [https://nodejs.org/en/download/](https://nodejs.org/en/download/)
3. AWS Command Line Interface Installed [https://aws.amazon.com/cli/](https://aws.amazon.com/cli/)
4. Git installed [https://git-scm.com/book/en/v2/Getting-Started-Installing-Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

## Cloning the Git Repository
1. open your command prompt/terminal
2. clone the repository

`git clone https://github.com/walkinjack/amplify-file-share.git`

## Amazon Web Services Credentials

You will need IAM credentials to access your current or new amazon account using the AWS CLI (AWS Command Line Interface). 

1. Go to the [Cloud Formation Create Stack Page](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/create/template)
2. Select Template is Ready and Upload a template file
3. Upload the AWS_NEW_USER.yml file located in the git repository we cloned, and continue with the defaults through each step until the template starts to create/template

