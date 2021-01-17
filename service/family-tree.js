const { Parent } = require("../model/parent");
const { Person, Gender } = require("../model/person");

class FamilyTree {
    #root;

    /**
     * @typedef {Object} FamilyTree
     * @param {string} kingName Name of the King
     * @param {string} queenName Name of the Queen
     */
    constructor(kingName, queenName) {
        const king = new Person(kingName, Gender.male);
        const queen = new Person(queenName, Gender.female);
        king.spouse = queen;
        queen.spouse = king;
        this.#root = new Parent(king, queen);
    }

    get root() {
        return this.#root;
    }

    /**
     * Adds a child to the parent by finding the mother
     * @param {string} motherName 
     * @param {string} childName 
     * @param {string} gender 
     */
    addChild(motherName, childName, gender) {
        let result = "PERSON_NOT_FOUND";
        let child = new Person(childName, gender);
        let parent = this.#findParent(this.#root.mother, motherName);
        if (parent) {
            if (parent.gender === Gender.male || !parent.spouse) {
                result = "CHILD_ADDITION_FAILED"

            } else {
                parent.children.push(child);
                parent.spouse.children.push(child);
                child.parent = new Parent(parent.spouse, parent);
                result = "CHILD_ADDITION_SUCCEEDED";
            }
        }

        LOG(result);
        return result;
    }

    /**
     * 
     * @param {Person} root 
     * @param {string} motherName 
     */
    #findParent(root, motherName) {
        if (!root.spouse)
            return;

        if (root.name === motherName) {
            return root;
        }

        if (root.spouse.name === motherName) {
            return root.spouse;
        }

        for (let child of root.children) {
            if (child.spouse) {
                let parent = this.#findParent(child, motherName);
                if (parent) {
                    return parent;
                }
            }
        }
    }

    /**
     * Adds a person as the spouse by finding the name
     * @param {Person} person 
     * @param {string} name 
     */
    addSpouse(spouseName, name, gender) {
        let person = new Person(name, gender);
        let targetPerson = this.#findSpouse(this.#root.mother, spouseName);
        if (targetPerson && (targetPerson.gender !== person.gender)) {
            targetPerson.spouse = person;
            person.spouse = targetPerson;
        } else {
            LOG("Spouse not found");
        }
    }

    /**
     * 
     * @param {Person} root 
     * @param {string} spouseName 
     */
    #findSpouse(root, spouseName) {
        if (root.children.length === 0) {
            if (!root.spouse && root.name === spouseName) {
                return root;
            }
            return;
        }

        for (let descendent of root.children) {
            let foundNode = this.#findSpouse(descendent, spouseName);
            if (foundNode) {
                return foundNode;
            }
        }
        return;
    }

    /**
     * 
     * @param {Person} root 
     * @param {string} name 
     */
    #findPerson(root, name) {
        if (root.name === name)
            return root;

        if (root.spouse && root.spouse.name === name) {
            return root.spouse;
        }

        if (root.children.length === 0)
            return;

        for (let descendent of root.children) {
            let foundNode = this.#findPerson(descendent, name);
            if (foundNode) {
                return foundNode;
            }
        }
        return;
    }

    /**
     * returns the gender of the relation
     * Eg male would be returned for Paternal-Uncle
     * @param {string} relation 
     */
    #getRelationGender(relation) {
        let result = "";
        let temp = relation.split("-");
        if (temp.length > 1) {
            if (temp.length === 2) {
                result = temp[1] === "Uncle" ? Gender.male : Gender.female;
            } else if (temp.length === 3) {
                result = temp[0] === "Sister" ? Gender.female : Gender.male;
            }
        } else {
            result = relation === "Son" ? Gender.male : Gender.female;
        }
        return result;
    }

    /**
     * Checks Bother/Sister In-Laws
     * @param {Person} person 
     * @param {Person} child 
     * @returns {string} Name of the brother/sister In-Laws
     */
    #getInLaws(person, child, genderCheck) {
        if (((person.parent && child.spouse &&
            child.name !== person.name &&
            child.spouse.gender === genderCheck) ||
            (person.spouse && person.spouse.parent &&
                child.name !== person.spouse.name &&
                child.gender === genderCheck))) {

            return person.parent ? child.spouse.name : child.name;
        }
    }

    /**
     * 
     * @param {string} name 
     * @param {string} relation 
     */
    getRelationship(name, relation) {
        let result = "PERSON_NOT_FOUND";
        let related = [];
        let person = this.#findPerson(this.#root.mother, name);
        let genderCheck = this.#getRelationGender(relation);
        if (person) {
            switch (relation) {
                case "Paternal-Uncle":
                case "Paternal-Aunt":
                    if (person.parent && person.father.parent) {

                        for (let child of person.grandFather.children) {
                            if (child.gender === genderCheck &&
                                (child.name !== person.fatherName &&
                                    child.name !== person.motherName)) {
                                related.push(child.name);
                            }
                        }
                    }
                    break;
                case "Maternal-Uncle":
                case "Maternal-Aunt":
                    if (person.parent && person.mother.parent) {

                        for (let child of person.grandMother.children) {
                            if (child.gender === genderCheck &&
                                (child.name !== person.fatherName &&
                                    child.name !== person.motherName)) {
                                related.push(child.name);
                            }
                        }
                    }
                    break;
                case "Sister-In-Law":
                case "Brother-In-Law":
                    if (person.parent || person.spouse) {
                        let desiredParent = person.parent ? person.father : person.spouse.father;
                        for (let child of desiredParent.children) {
                            let inLaws = this.#getInLaws(person, child, genderCheck)
                            if (inLaws)
                                related.push(inLaws);
                        }
                    }

                    break;
                case "Son":
                case "Daughter":
                    if (person.children.length > 0) {
                        for (let child of person.children) {
                            if (child.gender === genderCheck) {
                                related.push(child.name);
                            }
                        }
                    }
                    break;
                case "Siblings":
                    if (person.parent) {
                        let father = person.parent.father;
                        for (let child of father.children) {
                            if (child.name !== person.name)
                                related.push(child.name);
                        }
                    }
                    break;
            }
            result = "NONE";
            if (related.length > 0)
                result = related.join(" ");
        }

        LOG(result);
        return result;
    }
}

module.exports = {
    FamilyTree
}