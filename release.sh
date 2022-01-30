#!/bin/bash

# Build a production version of the site
ng build
# Add everything in dist/racer159-com
(cd dist/racer159-com; git add -f .)
# ommit, with a message to link to sources commit
(cd dist/racer159-com; git commit -m "Build from $(git log '--format=format:%H' master -1)")
# 5. Push to origin
git subtree push --prefix dist/racer159-com origin gh-pages
