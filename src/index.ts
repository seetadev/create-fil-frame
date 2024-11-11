#!/usr/bin/env node

import { program } from 'commander';
import inquirer from 'inquirer';
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

function showWelcomeMessage() {
  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   Welcome to Create Filecoin App
   Your access point to Filecoin development
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `);
}


function cloneContents(branch: string, projectPath: string) {
  const cloneBranch = branch === 'storacha' ? 'storacha-nfts' : branch === 'lighthouse' ? 'lighthouse-nfts' : branch === 'akave' ? 'akave-integration' : 'main';
  execSync(`git clone --branch ${cloneBranch} ${REPOSITORY_URL} ${projectPath}`);
  fs.rmSync(path.join(projectPath, '.git'), { recursive: true, force: true });
}

function runPackageInstall(projectPath: string, packageManager: string) {
  process.chdir(projectPath);
  execSync(`${packageManager} install`, { stdio: 'inherit' });
}

async function createFilecoinApp(projectName: string, branch: string, packageManager: string = 'yarn') {
  const sanitizedProjectName = sanitize(projectName);
  const projectPath = path.resolve(process.cwd(), sanitizedProjectName);

  console.log(`Creating project directory: ${sanitizedProjectName}`);
  fs.mkdirSync(projectPath);

  cloneContents(branch, projectPath);
  initRepo(projectPath);
  runPackageInstall(projectPath, packageManager);
  console.log(`Successfully created ${sanitizedProjectName}!`);
}


async function interactiveMode() {
  showWelcomeMessage();

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      validate: (input: string) => input.length > 0 || 'Project name is required'
    },
    {
      type: 'list',
      name: 'storageProvider',
      message: 'Which feature would you like to use?',
      choices: [
        { name: 'Storacha', value: 'storacha' },
        { name: 'Lighthouse', value: 'lighthouse' },
        { name: 'Akave', value: 'akave' },
        { name: 'Deal Client (not recommended for beginners)', value: 'main' }
      ]
    },
  ]);

  await createFilecoinApp(answers.projectName, answers.storageProvider, 'yarn');
}

program
  .version('1.0.1')
  .description('CLI to create a new Filecoin app')
  .argument('[project-name]', 'Name of the new project')
  .option('--storacha', 'Initialize the repository using Storacha as the storage provider')
  .option('--lighthouse', 'Initialize the repository using Lighthouse as the storage provider')
  .option('--akave', 'Initialize the repository using Akave as the storage provider')
  .action(async (projectName, options) => {
    if (!projectName) {
      await interactiveMode();
      return;
    }

    let branch = 'main';
    if (options.storacha) {
      branch = 'storacha';
    } else if (options.lighthouse) {
      branch = 'lighthouse';
    } else if (options.akave) {
      branch = 'akave';
    }
    await createFilecoinApp(projectName, branch, 'yarn');
  });

program.parse();