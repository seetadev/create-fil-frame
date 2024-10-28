#!/usr/bin/env node

import { program } from 'commander';
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import sanitize from 'sanitize-filename';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPOSITORY_URL = 'https://github.com/FIL-Builders/fil-frame.git';

function initRepo(projectPath: string) {
  process.chdir(projectPath);

  if (fs.existsSync('.git')) {
    fs.rmSync('.git', { recursive: true, force: true });
    if (fs.existsSync('.github')) {
      fs.rmSync('.github', { recursive: true, force: true });
    }
  }

  execSync('git init');
  execSync('git add .');
  execSync('git commit -m "init"');
}

function cloneContents(branch: string, projectPath: string) {
  const cloneBranch = branch === 'storacha' ? 'storacha-nfts' : branch === 'lighthouse' ? 'lighthouse-nfts' : 'main';
  execSync(`git clone --branch ${cloneBranch} ${REPOSITORY_URL} ${projectPath}`);

  // Remove the .git directory from the cloned repository
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });
}

function runYarnInstall(projectPath: string) {
  process.chdir(projectPath);
  execSync('yarn install', { stdio: 'inherit' });
}

function createFilecoinApp(projectName: string, branch: string) {
  const sanitizedProjectName = sanitize(projectName);
  const projectPath = path.resolve(process.cwd(), sanitizedProjectName);

  console.log(`Creating project directory: ${sanitizedProjectName}`);
  fs.mkdirSync(projectPath);

  cloneContents(branch, projectPath);
  initRepo(projectPath);
  runYarnInstall(projectPath);
  console.log(`Successfully created ${sanitizedProjectName}!`);
}

program
  .version('1.0.1')
  .description('CLI to create a new Filecoin app')
  .argument('<project-name>', 'Name of the new project')
  .option('--storacha', 'Initialize the repository using Storacha as the storage provider')
  .option('--lighthouse', 'Initialize the repository using Lighthouse as the storage provider')
  .action((projectName, options) => {
    let branch = 'main';
    if (options.storacha) {
      branch = 'storacha';
    } else if (options.lighthouse) {
      branch = 'lighthouse';
    }
    createFilecoinApp(projectName, branch);
  });

program.parse();