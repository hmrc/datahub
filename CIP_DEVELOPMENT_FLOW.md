# How we manage updates to the repository

- We should create a new branch for the version we're going to sync from upstream
e.g if there is a version 0.9.0 we create a new branch locally 0.9.0
- Rebase from the previous local version our changes
e.g if we had previous version 0.8.4 we should rebase all our commits from 0.8.4 to 0.9.0

- We use rebase to apply these changes

# Making changes on a release
If making changes against a version branch we should create new <version>-feature branch
and raise a PR against the main version branch

eg. main branch - 0.8.0
    feature branch - 0.8.0-feature
   
raise PR from 0.8.0-fature to 0.8.0

# Deprecation

We should only have 2 branches running at any time
the main active one and one previous version.

