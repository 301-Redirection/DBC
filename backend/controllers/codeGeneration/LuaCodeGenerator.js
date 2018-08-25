const NEW_LINE = '\n';
const TAB = '\t';

class LuaCodeGenerator {
    static getTab() {
        return TAB;
    }

    static getNewLine() {
        return NEW_LINE;
    }

    static createLuaFunction(indentString, content) {
        let code = '';
        code += `${indentString} function()`;
        for (let i = 0; i < content.length; i += 1) {
            code += `${indentString}${TAB}${content[i]}`;
        }
        code += `${indentString} end`;
        return code;
    }

    static createLuaTable(variableName, array, quoted) {
        let code = `local ${variableName} ={${NEW_LINE}`;
        for (let i = 0; i < array.length; i += 1) {
            if (quoted === true) {
                code += `${TAB}"${array[i]}",${NEW_LINE}`;
            } else {
                code += `${TAB}${array[i]},${NEW_LINE}`;
            }
        }
        code += `}${NEW_LINE}`;
        return code;
    }
}
module.exports.LuaCodeGenerator = LuaCodeGenerator;
