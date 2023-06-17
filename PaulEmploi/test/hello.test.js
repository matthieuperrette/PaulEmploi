const DB= require ("../model/pool.js");
const model= require ("../model/utilisateurs.js");
describe("Model Tests", () => {
    afterAll((done) => {
function callback (err){
if (err) done (err);
else done();
}
DB.end(callback);
});

    test ("readall user",()=>{
        model.readall(function (resultat){
            console.log("test")
            nb_retour = resultat.length;
            expect(nb_retour).toBeEqual(0);
        })

    }
    );
    test ("isValid user",()=>{
        model.isValid("test@test.fr","test", function (resultat){
            valid = resultat;
            expect(valid).toBeFalsy();
        })
    }
    );
    test ("create user",()=>{
        model.create("test2@test.fr","hello","world","mdp","0778899878", function (resultat){
            expect(resultat.affectedRows).toBeEqual(1);
        })

    }
    );
    test ("suppr user",()=>{
        model.delete("test2@test.fr", function (resultat){
            expect(2).not.toBe(2);
        })
    }
    );
})
