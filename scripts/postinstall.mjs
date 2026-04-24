import { spawnSync } from 'child_process';

const skipInstall = process.env['SKIP_WORKSPACE_POSTINSTALL'] === '1';

if (skipInstall) {
  process.exit(0);
}

const packages = [
  'apps/api',
  'apps/web',
  'apps/worker',
  'packages/shared',
  'packages/domain',
];

for (const workspace of packages) {
  const result = spawnSync(
    'npm',
    ['install', '--prefix', workspace, '--no-package-lock', '--no-fund', '--no-audit', '--install-links=false'],
    {
      stdio: 'inherit',
      shell: true,
      env: process.env,
    },
  );

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}
