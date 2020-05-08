.PHONY: help \
clean install \
lint unit coverage \
deploy

-include Makefile.env

ROOT_PATH=$(PWD)
SRC_PATH=$(ROOT_PATH)/src
TEST_PATH=$(ROOT_PATH)/test

AWS_PROFILE?=
ifdef AWS_PROFILE
SLS_OPTIONS=--aws-profile $(AWS_PROFILE)
endif

BIN:=$(ROOT_PATH)/node_modules/.bin
ESLINT=$(BIN)/eslint
JEST=$(BIN)/jest
SLS=$(BIN)/sls

test: lint coverage ## Run code linter, unit tests and code coverage report

help: ## Describe all available commands
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-10s\033[0m %s\n", $$1, $$2 }' $(MAKEFILE_LIST)

clean: ## Delete local build artifacts
	rm -rf coverage

install: ## Install npm dependencies for the dev/CICD environment
	npm i

lint: ## Run code linter
	@echo "Linting code..."
	@$(ESLINT) --ext .js,.jsx,.ts,.tsx $(SRC_PATH)
	@echo "Linting PASSED"

unit: ## Run unit tests
	@echo "Running unit tests..."
	@$(JEST) $(TEST_PATH)

coverage: ## Run unit tests & coverage report
	@echo "Running unit tests and coverage..."
	# @$(NYC) $(MOCHA) $(TEST_PATH)
	@$(JEST) $(TEST_PATH) --coverage

deploy: ## Deploy Serverless project
	@echo "Deploying Serverless project to stage $(STAGE)..."
	$(SLS) deploy $(SLS_OPTIONS)