#!/usr/bin/env node
// Builds the site and uploads out/ to a Cloudflare Pages PREVIEW branch.
// Usage: BRANCH=round-3 npm run deploy:preview
// It refuses the production branch names: a production deploy needs the
// owner's go and is not scripted here.

import { spawnSync } from 'node:child_process';

const PROJECT = 'diferdinando-portfolio';
const PRODUCTION = new Set(['main', 'master', 'production', 'prod']);

const branch = (process.env.BRANCH ?? '').trim();
if (!branch) {
  console.error('deploy-preview: set BRANCH to a preview name, e.g. BRANCH=round-3');
  process.exit(1);
}
if (PRODUCTION.has(branch.toLowerCase())) {
  console.error(`deploy-preview: "${branch}" is production; this script only deploys previews`);
  process.exit(1);
}

const run = (cmd, args) => {
  const r = spawnSync(cmd, args, { stdio: 'inherit' });
  if (r.status !== 0) process.exit(r.status ?? 1);
};

run('npm', ['run', 'build']);
run('npx', ['wrangler', 'pages', 'deploy', 'out', '--project-name', PROJECT, '--branch', branch]);
