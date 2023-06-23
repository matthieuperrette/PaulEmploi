// test/route.test.js file
const request = require("supertest");
const app = require("../app");

//page d'index
describe("Page Index/Auth", () => {
    test("devrait renvoyer status code 200", done => {
        request(app)
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                done();
            });
    });
});


//redirection candidat
describe("Route candidat redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .get("/candidat")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route candidatures redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .get("/candidat/Candidatures")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route devenir recruteur redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .get("/candidat/devenirRecruteur")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route crea organisation redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .get("/candidat/creaOrganisation")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route page d'offre redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .post("/candidat/PageOffre")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route candidater redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .post("/candidat/candidater")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route upload redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .post("/candidat/upload")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route suppression candidatures redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .post("/candidat/SupprimerCandidature")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});

describe("Route tri redirect", () => {
    test("devrait rediriger(status code 302) sur la page de connexion", done => {
        request(app)
            .post("/candidat/tri")
            .then(response => {
                expect(response.statusCode).toBe(302);
                expect(response.header.location).toBe('/');
                done();
            });
    });
});



//redirection routes administrateurs
