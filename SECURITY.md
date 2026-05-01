# Security & Secrets

This project must never contain active secrets in the repository history or working tree.

Immediate steps to follow if secrets were committed:

1. Rotate secrets (change passwords, regenerate DB users, Firebase keys, email passwords).
2. Remove secrets from the repository working tree (already removed `server/.env`).
3. Purge secrets from git history if they were pushed earlier (use BFG or git-filter-repo).

Example commands to remove a file from history with `git-filter-repo` (recommended):

```bash
# Install git-filter-repo (platform dependent)
# Example: pip install git-filter-repo

# Replace paths with files to remove
git clone --mirror https://github.com/yourorg/yourrepo.git
cd yourrepo.git
git filter-repo --path server/.env --invert-paths
git push --force
```

Or with BFG (simpler for common patterns):

```bash
bfg --delete-files server/.env
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

After purging, rotate all credentials referenced in the repo.
