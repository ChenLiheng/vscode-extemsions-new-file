import * as fs from 'fs/promises';
import * as vscode from 'vscode';
import * as path from 'path';

interface Generators {
  init: (uri: string, fileName: string) => Promise<[dirPath: string, fileName: string]>,
  createFuncComponent: any,
  createLessStyle: any,
}

const templatesDir: string = path.join(__dirname, '..', 'src/templates');


const generators = {
  init: async (uri: string, fileName: string) => {
    const dirPath = path.join(uri, fileName);
    const stat = await getStat(dirPath);
    if (stat) {
      vscode.window.showErrorMessage('组件目录已存在');
    } else {
      try {
        await fs.mkdir(dirPath);
      } catch (error) {
      }
    }
    return Promise.resolve([dirPath, fileName]);
  },
  createFuncComponent: async (dirPath: string, fileName: string) => {
    const templateFileName = `${templatesDir}/function.template`;
    const buffer = await fs.readFile(templateFileName);
    const componentContent = buffer.toString().replace(/{componentName}/g, fileName);
    await fs.writeFile(path.join(dirPath, `${fileName}.jsx`), componentContent);
    return Promise.resolve([dirPath, fileName]);
  },
  createLessStyle: async (dirPath: string, fileName: string) => {
    const templateFileName = `${templatesDir}/less.template`;
    const buffer = await fs.readFile(templateFileName);
    const cssContent = buffer.toString().replace(/{componentName}/g, fileName);
    await fs.writeFile(path.join(dirPath, `${fileName}.less`), cssContent);
    return Promise.resolve([dirPath, fileName]);
  },
} as Generators;

/**
 * 判断文件夹是否存在
 * @param dir 
 * @returns 
 */
async function getStat(dir: string) {
  try {
    const stat = await fs.stat(dir);
    if (stat.isDirectory()) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}


export default generators;