const request = require('supertest');
const app = require('../app');

let id

const newThing = {
    firstName: "Oscar",
    lastName: "Uriando",
    nationality: "Ecuatoriano",
    image: "http://guapo:8080",
    birthday: "1990-11-03"
}

const updateThing = {
    firstName: "Fanilo",
    lastName: "Xinyu",
    nationality: "Coreano",
    image: "http://normalito:8080",
    birthday: "1982-03-22"
}

test('GET /directors debe traer a todos los directores', async () => {
    const res = await request(app).get('/directors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
});

test('POST /directors debe egregar un director', async () => {
    const res = await request(app).post('/directors').send(newThing);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newThing.firstName); 
});

test('PUT /directors/:id de actualizar la informacion sobre el director', async () => {
    const res = await request(app).put('/directors/'+id).send(updateThing);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateThing.firstName);
    expect(res.body.lastName).toBe(updateThing.lastName);
    expect(res.body.nationality).toBe(updateThing.nationality);
});

test('DELETE /directors/:id de eliminar a un director', async () => {
    const res = await request(app).delete(`/directors/${id}`);
    expect(res.status).toBe(204); 
});