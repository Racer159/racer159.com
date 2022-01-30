#!/bin/bash

git worktree add dist/racer159-com gh-pages
# Build a production version of the site
ng build
# Add everything in dist/racer159-com
(cd dist/racer159-com; git add --all)
# ommit, with a message to link to sources commit
(cd dist/racer159-com; git commit -m "Build from $(git log '--format=format:%H' master -1)")
# 5. Push to origin
git push -f origin gh-pages
