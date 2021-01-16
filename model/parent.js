const { Person } = require('./person');

class Parent {
    #father;
    #mother;

    /**
     * @typedef {Object} Parent
     * @param {Person} father 
     * @param {Person} mother 
     */
    constructor(father, mother) {
        this.#father = father;
        this.#mother = mother;
        this.#father.spouse = mother;
        this.#mother.spouse = father;
    }

    /**
     * @returns {Person}
     */
    get father() {
        return this.#father;
    }

    /**
     * @returns {Person}
     */
    get mother() {
        return this.#mother;
    }
}

module.exports = {
    Parent
}