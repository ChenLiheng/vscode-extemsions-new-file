// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import generators from './generators';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "create-react-component" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('create-react-component.createFile', (uri: vscode.Uri) => {
    const path = uri ? uri.path : '';
    if (path && path.length > 0) {
      vscode.window.showInputBox({
        password: false,
        ignoreFocusOut: true,
        prompt: '请输入文件名',
      }).then(async (msg: string | undefined) => {
        if (msg && msg.length > 0) {
          const [dirPath, fileName] = await generators.init(path, msg);
          console.log(dirPath, fileName);
          await generators.createFuncComponent(dirPath,fileName);
          await generators.createLessStyle(dirPath, fileName);
        }
      });
    }
    // vscode.window.showInformationMessage(`当前文件(夹)路径是：${uri ? uri.path : '空'}`);
  });

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
