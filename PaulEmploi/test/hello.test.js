const DB= require ("../model/pool.js");
const model= require ("../model/utilisateurs.js");
describe("Model Tests", () => {
    afterAll(done=>{
        function callback (err){
            if (err) done (err);
            else done();
        }
        DB.end(callback);
    });
    test ("readall user",()=>{
        model.readall(function (resultat){
            nb_retour = length(resultat);
            console.log(nb_retour);
            expect(nom).toBeGreaterThan(0);
        })

    }
    );
    test ("isValid user",()=>{
        model.isValid("test@test.fr","mdp", function (resultat){
            valid = resultat;
            expect(valid).toBeTruthy();
        })

    }
    );
    
})
