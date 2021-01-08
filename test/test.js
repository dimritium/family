let assert = require('assert');

const { Operations } = require('../service/operations')
global.LOG = () => {}; //disable logging

function init() {
    let op;
    try {
        op = new Operations();
        op.executeFile('./resources/init.txt');
    } catch (err) {
        console.trace(err);
    }
    return op;
}

let ft = init().familyTree;
console.log(ft.getRelationship("Aria", "Siblings"));

describe('FamilyTree', () => {
    describe('GetRelationship', () => {
        it('should return PERSON_NOT_FOUND when the person is not present', () => {
            assert.strictEqual(ft.getRelationship("Aria", "Siblings"), "PERSON_NOT_FOUND")
        });
        it('should return None when the relationship is not present', () => {
            assert.strictEqual(ft.getRelationship("Lavnya", "Maternal-Aunt"), "NONE")
        });
        it('should return Kriya for Krithi Siblings', () => {
            assert.strictEqual(ft.getRelationship("Krithi", "Siblings"), "Kriya")
        });
        it('should return Jnki for Ahit Siblings', () => {
            assert.strictEqual(ft.getRelationship("Ahit", "Siblings"), "Jnki")
        });
        it('should return Lavnya for Jnki Daughter', () => {
            assert.strictEqual(ft.getRelationship("Jnki", "Daughter"), "Lavnya")
        });
        it('should return Vritha for Chit son', () => {
            assert.strictEqual(ft.getRelationship("Chit", "Son"), "Vritha")
        });
        it('should return "Ish Vich Aras" for Dritha Paternal-Uncle', () => {
            assert.strictEqual(ft.getRelationship("Dritha", "Paternal-Uncle"), "Ish Vich Aras")
        });
        it('should return Vritha for Chit son', () => {
            assert.strictEqual(ft.getRelationship("Chit", "Son"), "Vritha")
        });
        it('should return "Chit Ish Vich Aras" for Asva Maternal-Uncle', () => {
            assert.strictEqual(ft.getRelationship("Asva", "Maternal-Uncle"), "Chit Ish Vich Aras")
        });
        it('should return Tritha for Yodhan Maternal-Aunt', () => {
            assert.strictEqual(ft.getRelationship("Yodhan", "Maternal-Aunt"), "Tritha")
        });
        it('should return Satya for Vila Paternal-Aunt', () => {
            assert.strictEqual(ft.getRelationship("Vila", "Paternal-Aunt"), "Satya")
        });
        it('should return "Lika Chitra" for Chit Sister-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Chit", "Sister-In-Law"), "Lika Chitra")
        });
        it('should return NONE for Dritha Sister-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Dritha", "Sister-In-Law"), "NONE")
        });
        it('should return Vyan for Chit Brother-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Chit", "Brother-In-Law"), "Vyan")
        });
        it('should return Jaya for Vritha Brother-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Vritha", "Brother-In-Law"), "Jaya")
        });
        it('should return Ahit for Laki Maternal-Uncle', () => {
            assert.strictEqual(ft.getRelationship("Laki", "Maternal-Uncle"), "Ahit")
        });
        it('should return "Satvy Krpi" for Atya Sister-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Atya", "Sister-In-Law"), "Satvy Krpi")
        });
        it('should return PERSON_NOT_FOUND for Pjali Son', () => {
            assert.strictEqual(ft.getRelationship("Pjali", "Son"), "PERSON_NOT_FOUND")
        });
        it('should return "Vyas" for Satvy Brother-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Satvy", "Brother-In-Law"), "Vyas")
        });
        it('should return "NONE" for Kriya Brother-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Kriya", "Brother-In-Law"), "NONE")
        });
        
    });
    describe('AddChild', () => {
        it('should return CHILD_ADDITION_SUCCEEDED for Amba', () => {
            assert.strictEqual(ft.addChild("Amba", "Tron", "Male"), "CHILD_ADDITION_SUCCEEDED");
        });
        it('should return PERSON_NOT_FOUND for Pjali', () => {
            assert.strictEqual(ft.addChild("Pjali", "Srutak", "Male"), "PERSON_NOT_FOUND");
        });
        it('should return CHILD_ADDITION_FAILED for Asva', () => {
            assert.strictEqual(ft.addChild("Asva", "Vani", "Female"), "CHILD_ADDITION_FAILED");
        });
        it('should return CHILD_ADDITION_SUCCEEDED for Chitra', () => {
            assert.strictEqual(ft.addChild("Chitra", "Aria", "Female"), "CHILD_ADDITION_SUCCEEDED");
        });
        it('should return Aria for Lavnya Maternal-Aunt', () => {
            assert.strictEqual(ft.getRelationship("Lavnya", "Maternal-Aunt"), "Aria")
        });
        it('should return "Jnki Ahit" for Aria Siblings', () => {
            assert.strictEqual(ft.getRelationship("Aria", "Siblings"), "Jnki Ahit")
        });
        it('should return CHILD_ADDITION_SUCCEEDED for Satya', () => {
            assert.strictEqual(ft.addChild("Satya", "Yaya", "Female"), "CHILD_ADDITION_SUCCEEDED");
        });
        it('should return "Atya Yaya" for Satvy Sister-In-Law', () => {
            assert.strictEqual(ft.getRelationship("Satvy", "Sister-In-Law"), "Atya Yaya")
        });

    })
});


