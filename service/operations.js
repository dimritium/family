const fs = require('fs');
const readline = require('readline');
const { FamilyTree } = require('./family-tree');

class Operations {
    #familyTree;

    /**
     * 
     * @param {string} kingName 
     * @param {string} queenName 
     */
    constructor(kingName, queenName) {
        this.#familyTree = new FamilyTree(kingName, queenName); // Initializing the king and queen name
    }

    get familyTree() {
        return this.#familyTree;
    }
    
    /**
     * This method takes in filepath and executes the callback after parsing the file
     * @param {fs.PathLike} filepath 
     * @param {function} callback 
     */
    async readFile(filepath, callback) {
        const readStream = fs.createReadStream(filepath);

        const rl = readline.createInterface({
            input: readStream,
            crlfDelay: Infinity
        });
        
        for await(const line of rl) {
            if(line) {
                const [operation, target, name, gender] = line.split(" "); 
                callback(operation, target, name, gender);
            }
        }

    }

    /**
     * reads the file from the path and logs the result of the respective command
     * @param {fs.PathLike} filepath 
     */
    async executeFile(filepath) {
        await this.readFile(filepath, (operation, target, name, gender) => {
            switch(operation) {
                case "ADD_CHILD":
                    this.familyTree.addChild(target, name, gender);
                    break;
                case "ADD_SPOUSE":
                    this.familyTree.addSpouse(target, name, gender);
                    break;
                case "GET_RELATIONSHIP":
                    this.familyTree.getRelationship(target, name);
                    break;
            }
        })
    }
    
}             

module.exports = {
    Operations
}