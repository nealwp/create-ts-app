#!/usr/bin/env node
import inquirer from 'inquirer'
import * as fs from 'node:fs'
import * as path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const CURR_DIR = process.cwd()

const QUESTIONS = [
  {
    name: 'project-choice',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES
  },
  {
    name: 'project-name',
    type: 'input',
    message: 'Project name:',
    validate: function (input: string) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    }
  }
];

const prompt = inquirer.createPromptModule()

function createProject(projectPath: string) {
  if (fs.existsSync(projectPath)) {
    console.log(`Folder ${projectPath} exists. Delete or use another name.`);
    return false;
  }

  fs.mkdirSync(projectPath);

  return true;
}

const SKIP_FILES = ['node_modules', '.template.json'];

function createDirectoryContents(templatePath: string, projectName: string) {
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach(file => {
      const origFilePath = path.join(templatePath, file);
      
      const stats = fs.statSync(origFilePath);
  
      if (SKIP_FILES.indexOf(file) > -1) return;
      
      if (stats.isFile()) {
          let contents = fs.readFileSync(origFilePath, 'utf8');
          const writePath = path.join(CURR_DIR, projectName, file);
          fs.writeFileSync(writePath, contents, 'utf8');
      } else if (stats.isDirectory()) {
          fs.mkdirSync(path.join(CURR_DIR, projectName, file));           
          createDirectoryContents(path.join(templatePath, file), path.join(projectName, file));
      }
  });
}

prompt(QUESTIONS).then(answers => {
  const projectChoice = answers['project-choice'];
  const projectName = answers['project-name'];

  const templatePath = path.join(__dirname, 'templates', projectChoice);
  const tartgetPath = path.join(CURR_DIR, projectName);
  const options = {
    projectName,
    templateName: projectChoice,
    templatePath,
    tartgetPath
  }
  console.log(options);
  console.log(answers)
  
  if (!createProject(tartgetPath)) {
    return;
  }
  
  createDirectoryContents(templatePath, projectName);
})
