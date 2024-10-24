import { program } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';

function initRepo(projectPath: string) {
  process.chdir(projectPath);

  if (fs.existsSync('.git')) {
    fs.rmSync('.git', { recursive: true, force: true });
    fs.rmSync('.github', { recursive: true, force: true });
  }

  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "init"');
}

function cloneContents(repoUrl: string, branch: string, projectPath: string) {
  const cloneBranch = branch === 'storacha' ? 'storacha-nfts' : 'main';
  execSync(`git clone --branch ${cloneBranch} ${repoUrl} ${projectPath}`);

  // Remove the .git directory from the cloned repository
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });
}

function runYarnInstall(projectPath: string) {
  process.chdir(projectPath);
  execSync('yarn install', { stdio: 'inherit' });
}

function createFilecoinApp(projectName: string, repoUrl: string, branch: string) {
  const sanitizedProjectName = sanitize(projectName);
  const projectPath = path.resolve(process.cwd(), sanitizedProjectName);

  console.log(`Creating project directory: ${sanitizedProjectName}`);
  fs.mkdirSync(projectPath);

  cloneContents(repoUrl, branch, projectPath);
  initRepo(projectPath);
  runYarnInstall(projectPath);
  console.log(`Successfully created ${sanitizedProjectName}!`);
}

program
  .version('1.0.0')
  .description('CLI to create a new Filecoin app')
  .argument('<project-name>', 'Name of the new project')
  .option('-r, --repo <url>', 'URL of the repository to clone from', 'https://github.com/FIL-Builders/fil-frame.git')
  .option('--storacha', 'Initialize the repository using Storacha as the storage provider')
  .action((projectName, options) => {
    const branch = options.storacha ? 'storacha' : 'main';
    createFilecoinApp(projectName, options.repo, branch);
  });

program.parse(process.argv);