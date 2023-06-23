const DB= require ("../model/pool.js");
const utilisateurs = require('../model/utilisateurs');

describe("Test model utilisateurs", () => {
    beforeAll(() => {
    // des instructions à exécuter avant le lancement des tests
    });

    /*afterAll((done) => {
        function callback (err){
            if (err) done (err);
            else done();
        }
        //DB.end(callback);
    });*/
    

    test ("create user", ()=>{
        utilisateurs.create("test@test.fr", "TestNom", "TestPrenom", "mdp", "0672013966", function(value){
            utilisateurs.read("test@test.fr", function(value){
                expect(value.length).toBe(1);
            });
        });
    });

    test ("read user", ()=>{
        utilisateurs.read("test@test.fr", function(value){
            expect(value.length).toBe(1);
        });
    });

    test ("read all user", ()=>{
        utilisateurs.readall("test@test.fr", function(value){
            expect(value.length).toBeGreaterThan(0);
        });
    });

    test ("read user like", ()=>{
        utilisateurs.readallDemandesLike("testNom", function(value){
            expect(value.length).toBe(1);
        });
    });

    test ("update user nom", ()=>{
        utilisateurs.updateNom("TestNom2", "test@test.fr", function(value){
            utilisateurs.read("test@test.fr", function(value){
                expect(value[0].nom).toBe("TestNom2");
            });
        });
    });

    test ("update user", ()=>{
        utilisateurs.update(['prenom'], ['testPrenom2'], "test@test.fr",function(value){
            utilisateurs.read("test@test.fr", function(value){
                expect(value[0].prenom).toBe("TestNom2");
            });
        });
    });

    test ("update user CompteActif", ()=>{
        utilisateurs.updateCompteActif(0, "test@test.fr", function(value){
            utilisateurs.read("test@test.fr", function(value){
                expect(value[0].compte_actif).toBe(0);
            });
        });
    });


    test ("delete user", ()=>{
        utilisateurs.delete("test@test.fr", function(value){
            utilisateurs.read("test@test.fr", function(value){
                expect(value.length).toBe(0);
            });
        });
    });
    
    
    
        

});