
class Person {
    #children = [];
    #name;
    #gender;
    #parent;
    #spouse;

    /**
     * @typedef {Object} Person
     * @param {string} name 
     * @param {string} gender 
     */
    constructor(name, gender) {
        this.#name = name;
        this.#gender = gender;
    }

    set name(name) {
        this.#name = name;
    }

    get name() {
        return this.#name;
    }

    get gender() {
        return this.#gender;
    }

    /**
     * 
     * @param {Parent} parent
     */
    set parent(parent) {
        this.#parent = parent;
    }

    get parent() {
        return this.#parent;
    }

    /**
     * 
     * @param {Person} spouse
     */
    set spouse(spouse) {
        this.#spouse = spouse;
    }

    get spouse() {
        return this.#spouse;
    }

    get children() {
        return this.#children;
    }
}

const Gender = {
    male: "Male",
    female: "Female"
}

module.exports = {
    Person, Gender
};
