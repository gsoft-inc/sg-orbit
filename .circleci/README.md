## Circle CI config

Circle CI has been setup to only run build on pull request.

The only exception is the default branch (master) which will run the builds on every commit.

## github-chromatic

A separate workflow has been created because when chromatic detect a change that need to be accepted we would need to re-run all the circle ci builds once the the changes are accepted in order for the build to pass and be able to merge the PR.
