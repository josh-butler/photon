#!/bin/bash
# echo "Hello World"

# GIT_BRANCH="feature-some-change"
GIT_BRANCH="feature/SPDATATECH-1234-some-change"
# GIT_BRANCH="feature/SPDATATECH-1234-some-change"
# GIT_BRANCH="SPDATATECH-1234-some-change"
# GIT_BRANCH="spdatatech-1234-some-change"
# PR_STAGE=abs
echo $GIT_BRANCH

if [[ "$GIT_BRANCH" =~ ^.*(SPDATATECH-[0-9]+).*$ ]]
then
    PR_STAGE=${BASH_REMATCH[1]}
else
    PR_STAGE=${GIT_BRANCH}
fi

# PR_STAGE=${BASH_REMATCH[1]}

echo $PR_STAGE

# if [ foo ]; then a && b; elif [ bar ]; c && d; else e && f; fi

# if [[ "$GIT_BRANCH" =~ ^.*(SPDATATECH-[0-9]+).*$ ]]; then PR_STAGES=${BASH_REMATCH[1]}; else PR_STAGES=${GIT_BRANCH}; fi 

echo $PR_STAGES

# if [[ "$GIT_BRANCH" =~ ^.*(SPDATATECH-[0-9]+).*$ ]]
# then
#     printf "match: ${BASH_REMATCH[1]}\n"
# else
#     printf "no match: $PWD\n"
# fi

# if [[ "$PWD" =~ ^.*(tmp[0-9]+).*$ ]]
# then
#     printf "match: ${BASH_REMATCH[1]}\n"
# else
#     printf "no match: $PWD\n"
# fi

if [[ "$GIT_BRANCH" =~ ^.*(SPDATATECH-[0-9]+).*$ ]]; then printf "match: ${BASH_REMATCH[1]}\n"; else printf "no match: $PWD\n"; fi