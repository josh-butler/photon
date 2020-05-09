.PHONY: help \
clean install \
lint unit coverage \
install pre-build build post-build \
invoke api deploy

-include Makefile.env

ROOT_PATH=$(PWD)
SRC_PATH=$(ROOT_PATH)/src

BIN:=$(ROOT_PATH)/node_modules/.bin
ESLINT=$(BIN)/eslint
JEST=$(BIN)/jest
SLS=$(BIN)/sls

APP_ENVIRONMENT?=dev
APP_BUCKET?=lambdadeploys
AWS_REGION?=us-east-1
FUNCTION_NAME?=
SLS_ENV?=
SLS_EVENT?=

ifdef EVENT_PATH
SLS_EVENT=--path $(EVENT_PATH)
endif

AWS_PROFILE?=
ifdef AWS_PROFILE
SLS_OPTIONS=--aws-profile $(AWS_PROFILE)
endif

test: lint coverage ## Run code linter, unit tests and code coverage report

all: clean npmi test deploy ## clean, install, test & deploy app

help: ## Describe all available commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean: ## Delete local artifacts
	rm -rf coverage node_modules

npmi: ## Install npm dependencies
	npm i

lint: ## Run code linter
	@echo "Linting code..."
	@$(ESLINT) --quiet --ext .js,.jsx,.ts,.tsx $(SRC_PATH)
	@echo "Linting PASSED"

unit: ## Run unit tests
	@echo "Running unit tests..."
	@$(JEST)

coverage: ## Run unit tests & coverage report
	@echo "Running unit tests and coverage..."
	@$(JEST) --coverage

invoke: ## Invoke individual Lambda
	$(SLS) invoke local --function $(FUNCTION_NAME) $(SLS_EVENT) $(SLS_ENV)

api: ## Run the API locally
	$(SLS) offline

deploy: ## Deploy Serverless project
	@echo "Deploying Serverless project to stage $(APP_ENVIRONMENT)..."
	APP_BUCKET=$(APP_BUCKET) $(SLS) deploy  --stage $(APP_ENVIRONMENT) --region $(AWS_REGION) $(SLS_OPTIONS)

install: npmi # Optional rule intended for use in the CICD environment
	@echo INSTALL phase completed `date`

pre-build: test # Optional rule intended for use in the CICD environment
	@echo PRE_BUILD phase completed `date`

build: deploy # Optional rule intended for use in the CICD environment
	@echo BUILD phase completed `date`

post-build: # Optional rule intended for use in the CICD environment
	@echo POST_BUILD phase completed `date`
