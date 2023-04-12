#!/usr/bin/env node
import inquirer from 'inquirer'
import * as fs from 'node:fs'
import * as path from 'node:path'

const CHOICES = fs.readdirSync(`./templates`);
const DIR = process.cwd()

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
 
prompt(QUESTIONS).then(answers => {
    const projectChoice = answers['project-choice'];
    const projectName = answers['project-name'];    
    
    const templatePath = path.join(DIR, 'templates', projectChoice);
    const tartgetPath = path.join(DIR, projectName);    
    const options = {
        projectName,
        templateName: projectChoice,
        templatePath,
        tartgetPath
    }    
    console.log(options);
    console.log(answers)
})
