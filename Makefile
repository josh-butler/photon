.PHONY: help \
clean install package compile build

-include Makefile.env

ROOT_PATH=$(PWD)
SRC_PATH=$(ROOT_PATH)
# SRC_PATH=$(ROOT_PATH)/src
# TEST_PATH="$(SRC_PATH)/**/*.test.ts"
# TEST_NAME?=
AWS_PROFILE?=

ifdef AWS_PROFILE
SLS_OPTIONS=--aws-profile $(AWS_PROFILE)
endif

# STAGE:=$(shell node scripts/get_stage.js)
# SLS_DIR=$(ROOT_PATH)/serverless
# SLS_PKG=$(ROOT_PATH)/.package/nhl-pipeline
# SLS_CONFIG=nhl-pipeline.yml
# SLS_OPTIONS:=--stage $(STAGE) --config $(SLS_CONFIG) --package $(SLS_PKG) --aws-s3-accelerate --verbose
# FUNCTION_NAME?=

BIN:=$(ROOT_PATH)/node_modules/.bin
ESLINT=$(BIN)/eslint
# TSC=$(BIN)/tsc
JEST=$(BIN)/jest
SLS=$(BIN)/sls

# Determines which command should be called for "deploy and test"
# depending on current environment (CodeBuild vs local dev)
# DEPLOY_TEST_CMD:=package-deploy-integration
# ifdef CODEBUILD_SOURCE_VERSION
# ifndef CODEBUILD_WEBHOOK_TRIGGER
# DEPLOY_TEST_CMD:=package
# endif
# endif

test: lint coverage ## Run code linter, unit tests and code coverage report

help: ## Describe all available commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean: ## Delete local build artifacts
	rm -rf coverage

install: ## Install npm dependencies for the dev/CICD environment
	npm i

lint: ## Run code linter
	@echo "Linting code..."
	@$(ESLINT) --ext .js,.jsx,.ts,.tsx ./
	@echo "Linting PASSED"

unit: ## Run unit tests
	@echo "Running unit tests..."
	@$(JEST)
	# @$(MOCHA) $(TEST_PATH)

coverage: ## Run unit tests & coverage report
	@echo "Running unit tests and coverage..."
	# @$(NYC) $(MOCHA) $(TEST_PATH)
	@$(JEST) --coverage

deploy: ## Deploy Serverless project
	@echo "Deploying Serverless project to stage $(STAGE)..."
	$(SLS) deploy $(SLS_OPTIONS)