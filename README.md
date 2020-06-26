# Typescript Starter

Starter configurations to work with Typescript on node with vscode.

## Included

- Typescript
- Eslint
- Prettier
- Jest
- Husky + Lint-Staged
- Commitlint

EsLint and Prettier are run as a pre-commit hook via Husky.
Commitlint enforces [conventional commit](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) messages and is run as a commit-msg hook via husky


## Steps

1. clone this repo
2. Delete helloworld.ts and helloworld.spec.ts
3. update npm.main and .vscode/launch.json .program to point towards correct entry file.

## Linting

The linting is relatively comprehensive and includes recommended rules from:

- typescript
- jest
- import 
- prettier 