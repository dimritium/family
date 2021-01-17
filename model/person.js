
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

    get father() {
        return this.#parent.father;
    }

    get mother() {
        return this.#parent.mother;
    }

    get fatherName() {
        return this.#parent.father.name;
    }

    get motherName() {
        return this.#parent.mother.name;
    }

    get grandFather() {
        return this.#parent.father.father;
    }

    get grandMother() {
        return this.#parent.mother.mother;
    }

    get grandParent() {
        return this.#parent.father.parent;
    }
}

const Gender = {
    male: "Male",
    female: "Female"
}

module.exports = {
    Person, Gender
};
