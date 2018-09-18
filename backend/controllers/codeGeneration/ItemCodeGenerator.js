const { LuaCodeGenerator } = require('./LuaCodeGenerator.js');
const fs = require('fs-extra');
const path = require('path');

const ITEM_TEMPLATE_FOLDER_NAME = 'itemTemplates';
const PATH_TO_TEMPLATE_SCRIPTS = path.join(__dirname, '..', '..', 'static', 'codeTemplates');
const NEW_LINE = LuaCodeGenerator.getNewLine();

class ItemCodeGenerator {
    /**
     *  This recursive function accepts an array of 'item' objects and decomposes
     *  it into an array of item name strings where the deepest component
     *  items appear first followed by their parent item.
     *
     *  @example
     *   [{
     *      name: 'dagon_1',
     *      components: [
     *          {
     *              name: 'staff_of_wizardry',
     *              components: [],
     *          },
     *          {
     *              name: 'null_talisman',
     *              components: [
     *
     *                  {
     *                      name: 'mantle',
     *                      components: [],
     *                  },
     *                  {
     *                      name: 'circlet',
     *                      components: [],
     *                  },
     *                  {
     *                      name: 'recipe',
     *                      components: [],
     *                  },
     *              ],
     *          },
     *      ]
     * }]
     *
     * becomes ['mantle' circlet', 'recipe', 'staff_of_wizardry' ,'dagon_1']
     */
    static getComponentAsArray(item) {
        // no item, no array
        if (!item) {
            return [];
        }
        // base case, has no components
        if (!item.components || item.components == 'null') {
            return [item.name];
        }
        const components = [];
        item.components.forEach((element) => {
            const arr = this.getComponentAsArray(element);
            arr.forEach((tempElement) => {
                components.push(tempElement);
            });
        });
        components.push(item.name);
        return components;
    }

    /**
     *  Generates final LUA code snippet to be inserted into the template file
     *  as string, specifying which items the bot must get
     *  and in what order
     */
    static generateItemCodeFromArray(itemArray) {
        const code = LuaCodeGenerator.createLuaTable('ItemsToBuy', itemArray, true);
        return code;
    }

    /**
     *  This function expects items as an array of objects as the following
     * {
     *      name: 'api_name',
     *      components: [
     *          {
     *              name: 'other_name',
     *              components: [],
     *          },
     *          {
     *              name: 'other_recipe',
     *              components: [
     *
     *                  {
     *                  name: 'other_item_name',
     *                  components: [],
     *                  },
     *              ],
     *          },
     *      ]
     * }
     *
     *  And traverse the list of components in a depth first
     *  manner such that all components are arranged in a
     *  a single 1-D array
     *
     */
    static generateItemCode(itemsArray) {
        // const arr = [];
        let arr = [];
        for (let i = 0; i < itemsArray.length; i += 1) {
            const items = this.getComponentAsArray(itemsArray[i]);
            // fancy way to join arrays
            arr = items.reduce((col, item) => {
                col.push(item);
                return col;
            }, arr);
        }
        return this.generateItemCodeFromArray(arr);
    }

    /**
     * This generates the item_purchase file using the template code
     * to ensure that all valid code is present while the newly generated code
     * is added.
     *
     * This this.expects a hero name and the array of items (note: the items must
     * be in the form accepted by the dota bot scripting API e.g. "item_recipe_dagon")
     */
    static generateItemFileContent(hero, itemArray) {
        const filename = `item_purchase_${hero}_template.lua`;
        let fileContents = fs.readFileSync(path.join(PATH_TO_TEMPLATE_SCRIPTS, ITEM_TEMPLATE_FOLDER_NAME, filename), 'utf8', (err) => {
            if (err) throw err;
        });
        const contents = this.generateItemCode(itemArray);
        fileContents = fileContents.replace('{{- items-to-buy -}}', `${contents}${NEW_LINE}`);
        return fileContents;
    }
}
module.exports.ItemCodeGenerator = ItemCodeGenerator;
