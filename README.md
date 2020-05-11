# SLS TS Boilerplate [WIP]

Serverless framework Typescript project with CodePipeline boilerplate project.

## App Config

App configuration is contained in `sls.config.js`. During inital project setup the following variables
should be updated.

* `name`: The App/Service name (eg. cool-api)
* `defaultBucket`: The name of an shared S3 bucket that will hold local dev deployment artifacts.
* `local, dev, prod`: Environment/Stage specific paramaters that will be passed to serverless.yml

## CI/CD

The app for multiple environments is deployed automatically upon a code merge to the `dev` or `master` branch for the `dev` and `prod` environments respectively.

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
ParameterKey=Environment,ParameterValue=prod \
ParameterKey=GitHubOwner,ParameterValue=github-username \
ParameterKey=GitHubToken,ParameterValue=[TOKEN-HERE]
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
| all      | Clean, lint, install & deploy to dev stage |
| api      | Run the API locally |
| invoke    | Invoke an individual Lambda function |
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
|/test | Test related files |

### Developemnt Flow
1. Add AWS resources as needed to serverless.yml (eg. Lambda, DynamoDB, etc.)
2. Add supporting Lambda code under src/functions
3. Add test coverage and run `make` or `make test`
4. Deploy to dev with `make all` and test as needed
5. Create a Pull Request to merge into the appropriate branch (eg. dev, master)
