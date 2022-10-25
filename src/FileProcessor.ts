
const yaml = require('js-yaml');
const fs = require('fs');
/**This class is responsible for handling the the .yaml files. This includes:
 *
 * - Parsing the .yaml files
 * - Creating the .json objects
 * - Creating the .yaml files
 *
 *
 * **/


class FileProcessor {
    /**
     * This function takes in a .yaml file and returns a .json object.
     * @param {string} filePath {string} {string}
     * @returns {object} json object
     */
    async parseYaml(filePath: string): Promise<object>   {
        //TODO: Add spinner to show that the file is being parsed

        try {
            const json = yaml.load(fs.readFileSync(filePath, 'utf8'));
            return json;
        } catch (err) {
            throw new Error(err);
        }

    }

    /**
     * This function takes in a .json object and returns a .yaml formatted text.
     * @param json
     * @returns {string} yaml formatted text
     */
    jsonToYaml(json: object): string {
        return yaml.dump(json);
    }


    /**
     *  Writes a .yaml file to the specified path.
     *  @param {string} filePath {string} {string}
     *  @param {object} json {object} {object}
     *  @returns {Promise<void>}
     *
     */
    async writeFile(filePath: string, json: any): Promise<void> {
        //TODO: Add spinner to show that the file is being written

        try {
            fs.writeFileSync(filePath, this.jsonToYaml(json));
        } catch (err) {
            throw new Error(err);
        }
    }


}
module.exports = FileProcessor;