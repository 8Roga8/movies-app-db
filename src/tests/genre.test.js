const request = require('supertest');
const app = require('../app');

let id

const newThing = {
    name: "psicologica"
}

const updateThing = {
    name: "infantil"
}

test('GET /genres debe traer todos los generos', async () => {
    const res = await request(app).get('/genres');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array); 
});

test('POST /genres debe egregar un genero', async () => {
    const res = await request(app).post('/genres').send(newThing);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(newThing.name); 
});

test('PUT /genres/:id de actualizar un genero', async () => {
    const res = await request(app).put('/genres/'+id).send(updateThing);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateThing.name);
});

test('DELETE /genres/:id de eliminar un genero', async () => {
    const res = await request(app).delete(`/genres/${id}`);
    expect(res.status).toBe(204); 
});