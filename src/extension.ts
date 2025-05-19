// 导入 vscode 模块，这是开发 VS Code 插件所必需的
import * as vscode from 'vscode';

// activate 函数是插件的入口点，当插件被激活时，VS Code 会调用这个函数
export function activate(context: vscode.ExtensionContext) {

    // 在控制台输出一条消息，表明插件已成功激活
    // 这对于调试和确认插件状态很有用
    console.log('Congratulations, your extension "lisp-run-button" is now active!');

    // 注册一个命令，命令的 ID 是 'extension.runLispScript'
    // 当用户通过命令面板或者快捷键触发这个命令时，提供的回调函数会被执行
    let disposable = vscode.commands.registerCommand('extension.runLispScript', () => {
        // 获取当前活动的文本编辑器
        const editor = vscode.window.activeTextEditor;
        // 检查是否存在活动的文本编辑器，并且打开的文件的语言 ID 是 'lisp' 或 'commonlisp'
        if (editor && (editor.document.languageId === 'lisp' || editor.document.languageId === 'commonlisp')) {
            // 获取当前打开文件的完整路径
            const filePath = editor.document.fileName;
            // 在运行脚本之前，确保文件已保存
            editor.document.save().then(success => {
                // 如果文件保存成功
                if (success) {
                    // 创建一个新的终端实例，终端的名称会显示文件的相对路径，方便用户识别
                    const terminal = vscode.window.createTerminal(`Run Lisp: ${vscode.workspace.asRelativePath(filePath)}`);
                    // 向终端发送命令来执行 Lisp 脚本
                    // sbcl 是一个常见的 Common Lisp 实现，--script 参数告诉 sbcl 执行指定的脚本文件
                    terminal.sendText(`sbcl --script "${filePath}"`);
                    // 显示终端窗口
                    terminal.show();
                } else {
                    // 如果文件保存失败，显示错误消息
                    vscode.window.showErrorMessage('Failed to save the file before running.');
                }
            });
        } else {
            // 如果没有活动的 Lisp 编辑器，或者当前文件不是 Lisp 文件，显示提示信息
            vscode.window.showInformationMessage('No active Lisp (.lisp or .cl) editor found, or file is not a Lisp file.');
        }
    });

    // 将注册的命令添加到插件的订阅中
    // 这样当插件被停用时，VS Code 可以自动清理这个命令相关的资源，防止内存泄漏
    context.subscriptions.push(disposable);
}

// deactivate 函数在插件被停用时调用
// 可以在这里执行一些清理工作，比如释放资源等
export function deactivate() {}
