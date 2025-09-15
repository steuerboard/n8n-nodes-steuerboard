# Publishing to NPM

This guide explains how to publish new versions of the n8n-nodes-steuerboard package to npm.

## Prerequisites

1. **NPM Account**: You need an npm account with publish permissions for the package
2. **GitHub Permissions**: You need write access to the repository to create releases
3. **NPM Token**: Set up an NPM_TOKEN secret in GitHub repository settings

## Setting up NPM Token

1. Log in to your npm account at [npmjs.com](https://www.npmjs.com)
2. Navigate to Access Tokens: Account Settings → Access Tokens
3. Generate a new Classic Token with "Automation" type
4. Copy the token
5. In GitHub, go to your repository → Settings → Secrets and variables → Actions
6. Create a new repository secret named `NPM_TOKEN` and paste your token

## Publishing Process

### Method 1: GitHub Release Workflow (Recommended)

This is the easiest way to create a release and publish to npm:

1. Go to the Actions tab in your GitHub repository
2. Click on "Release and Publish" workflow
3. Click "Run workflow"
4. Select the release type:
   - `patch`: Bug fixes (0.1.0 → 0.1.1)
   - `minor`: New features (0.1.0 → 0.2.0)
   - `major`: Breaking changes (0.1.0 → 1.0.0)
   - `prepatch`, `preminor`, `premajor`: Pre-release versions
   - `prerelease`: Increment pre-release version
5. Click "Run workflow"

The workflow will:

- Run tests and linting
- Bump the version in package.json
- Create a git tag
- Create a GitHub release with auto-generated notes
- Publish the package to npm with provenance

### Method 2: Manual Release with release-it

For more control over the release process:

```bash
# Make sure you're on main branch with clean working directory
git checkout main
git pull

# Install dependencies
npm ci

# Run release-it
npm run release
```

Follow the interactive prompts to:

- Select version bump type
- Review changes
- Confirm release

### Method 3: Manual GitHub Release

1. Update version in package.json manually
2. Commit the change: `git commit -m "chore: release v0.2.0"`
3. Create a tag: `git tag v0.2.0`
4. Push changes: `git push --follow-tags`
5. Create a release on GitHub manually

## Version Guidelines

Follow semantic versioning:

- **MAJOR** (1.0.0): Breaking changes
  - Removing features
  - Changing API interfaces
  - Incompatible changes

- **MINOR** (0.1.0): New features
  - Adding new operations
  - New functionality
  - Backward compatible changes

- **PATCH** (0.0.1): Bug fixes
  - Fixing bugs
  - Documentation updates
  - Minor improvements

## CI/CD Pipeline

### Continuous Integration (CI)

Every push and PR triggers:

- Linting checks
- Code formatting verification
- Package building
- Testing on Node.js 18, 20, and 22

### Combined Release and Publish Workflow

The "Release and Publish" workflow handles everything in one go:

1. Checks out code
2. Sets up Node.js with npm cache
3. Installs dependencies
4. Runs linting and builds the package
5. Bumps version and creates git tag
6. Creates GitHub release with auto-generated notes
7. Publishes to npm with provenance

Note: The separate publish workflow still exists for manual GitHub releases.

## Pre-release Testing

Before releasing:

1. **Test locally**:

   ```bash
   npm run lint
   npm run build
   npm pack --dry-run  # Preview package contents
   ```

2. **Test in n8n**:

   ```bash
   # Build the package
   npm run build

   # Link globally
   npm link

   # In your n8n instance
   npm link n8n-nodes-steuerboard
   ```

3. **Verify package contents**:
   ```bash
   npm pack
   tar -tf n8n-nodes-steuerboard-*.tgz
   ```

## Troubleshooting

### Build Failures

If the build fails:

1. Check lint errors: `npm run lint`
2. Fix formatting: `npm run format`
3. Ensure TypeScript compiles: `npm run build`

### Publishing Failures

Common issues:

- **401 Unauthorized**: Check NPM_TOKEN is valid
- **403 Forbidden**: Ensure you have publish permissions
- **Version exists**: Version already published, bump version

### Emergency Deprecation

If you need to deprecate a version:

```bash
npm deprecate n8n-nodes-steuerboard@0.1.0 "Critical bug, use 0.1.1"
```

## Best Practices

1. **Always test before releasing**
2. **Write clear commit messages** using conventional commits
3. **Update CHANGELOG.md** (automated with release-it)
4. **Create detailed release notes** for major/minor versions
5. **Use pre-releases** for testing major changes
6. **Monitor npm downloads** and GitHub issues after release

## Quick Release Checklist

- [ ] All tests pass locally
- [ ] Version bump makes sense (patch/minor/major)
- [ ] CHANGELOG.md is up to date
- [ ] Documentation is updated if needed
- [ ] Package builds successfully
- [ ] Committed all changes
- [ ] On main branch with clean working directory

## Support

For issues with publishing:

1. Check GitHub Actions logs
2. Verify npm permissions
3. Check repository secrets
4. Open an issue if problems persist
