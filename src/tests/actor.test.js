const request = require('supertest');
const app = require('../app');

let id

const newThing = {
    firstName: "Paula",
    lastName: "Villa Nueva",
    nationality: "Argrntina",
    image: "http://guapo:8080",
    birthday: "1990-11-03"
}

const updateThing = {
    firstName: "Jocar",
    lastName: "Pordiosero",
    nationality: "Frances",
    image: "http://guapo:8080",
    birthday: "1990-11-03"
}

test('GET /actors debe traer a todos los actores', async () => {
    const res = await request(app).get('/actors');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
});

test('POST /actors debe egregar a un actor', async () => {
    const res = await request(app).post('/actors').send(newThing);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.firstName).toBe(newThing.firstName);
});

test('PUT /actors/:id de actualizar la informacion sobre un actor', async () => {
    const res = await request(app).put(`/actors/${id}`).send(updateThing);
    expect(res.status).toBe(200);
    expect(res.body.firstName).toBe(updateThing.firstName);
    expect(res.body.birthday).toBe(updateThing.birthday);
    expect(res.body.image).toBe(updateThing.image);
});

test('DELETE /actors/:id de eliminar a un actor', async () => {
    const res = await request(app).delete('/actors/'+id);
    expect(res.status).toBe(204); 
});