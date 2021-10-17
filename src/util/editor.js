


export function patchCommand(editor, commandName, implementation) {
    const commands = editor.commandManager.rawCommands ?? editor.commandManager.commands;
    const rawCommand = commands[commandName];
    commands[commandName] = implementation.call(editor, rawCommand);
}
