# SLS TS Boilerplate [WIP]

Serverless framework Typescript project with CodePipeline boilerplate project.

## CI/CD

The app for mulyiple environments is deployed automatically upon a code merge to the `dev`, `qa` or `master` branch for the matching environments respectively.

The deployment pipelines are handled by AWS CodePipeline while the code is validated, tested, built and deployed
via AWS CodeBuild and the Serverless framework.

## Templates

### serverless.yml
A Serverless framework template that defines the related Lambda Function, DynamoDB table, API Gateway, IAM roles, etc.

### pipeline.yaml
A CloudFormation template that defines the deployment pipeline (CodePipeline & CodeBuild project) and related resources.

#### Deployment example

```bash
aws cloudformation create-stack \
--profile default \
--region us-east-1 \
--capabilities CAPABILITY_IAM \
--stack-name prod-demo-api-pipeline \
--template-body file://pipeline.yaml \
--parameters ParameterKey=GitHubRepo,ParameterValue=sls-ts-boilerplate  \
ParameterKey=GitHubBranch,ParameterValue=master  \
ParameterKey=GitHubOwner,ParameterValue=github-username  \
ParameterKey=GitHubToken,ParameterValue=[TOKEN-HERE]  \
ParameterKey=AppStackName,ParameterValue=prod-demo-api  \
ParameterKey=Environment,ParameterValue=prod
```

### Makefile
A Makefile is provided in the project root directory and is used to run commands during local development and deployment.

Default environment variables used by the Makefile can be overwritten by creating a `Makefile.env` file as shown below. This file is **OPITONAL** and should **NOT** be committed into version control.

```bash
REGION=us-east-1
AWS_PROFILE=default
...
```

**Usage Examples**
```bash
make test
```

| Command   | Description |
| --------- | ----------- |
| help      | Describe all available commands |
| npmi   | Install npm dependencies |
| test      | Run code linter, unit tests and code coverage report |
| lint      | Run code linter |
| coverage  | Run unit tests & coverage report |
| unit      | Run unit tests |
| clean     | Delete local artifacts |
| deploy     | Deploy Serverless project |


## App Development

### Folder Structure

| Folder        | Purpose       |
| ------------- |:-------------:|
|/src | Source code |
|/test | testing related files |

### Developemnt Flow
1. Add AWS resources as needed to serverless.yml (eg. Lambda, DynamoDB, etc.)
2. Add supporting Lambda code under src/functions
3. Add test coverage and run `make` or `make test`
4. Create a Pull Request to merge into the appropriate branch (eg. dev, qa, master)

**NOTE** PR testing not yet implemented in this project.