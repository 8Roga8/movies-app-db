const request = require('supertest');
const app = require('../app');
const Genre = require('../models/Genre');
const Director = require('../models/Director');
const Actor = require('../models/Actor');

let id

const newThing = {
    name: "Robots",
    image: "http://robots:8080",
    synopsis: "Lorem ipsum dolor sit amet consectetur adipiscing elit, primis nisl fames mi bibendum hendrerit faucibus, fusce non integer cursus habitant luctus. Eget himenaeos senectus mauris habitasse cum porta erat tortor facilisis, placerat egestas sed suspendisse eleifend consequat tempus iaculis lobortis, quis vitae neque aenean cubilia libero leo massa. Fringilla magnis ut aenean himenaeos metus dictum dignissim, mi mattis cursus augue sociis orci accumsan, blandit bibendum vel magna leo odio.",
    releaseYear: 2005
};

const updateThing = {
    name: "Ridick",
    image: "http://ridick:8080",
};


test('GET /movies debe traer todas las peliculas', async () => {
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /movies debe agregar una pelicula', async () => {
    const res = await request(app).post('/movies').send(newThing);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.body.name).toBe(newThing.name);
})

test('PUT /movies/:id de actualizar la informacion de una pelicula', async () => {
    const res = await request(app).put(`/movies/${id}`).send(updateThing);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(updateThing.name);
    expect(res.body.image).toBe(updateThing.image);
});

test('POST /movies/:id/genres dede insertar los generos de la pelicula', async () => {
    const genre = await Genre.create({
        name: "psicologica"
    });
    const res = await request(app).post(`/movies/${id}/genres`).send([genre.id]);
    await genre.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/directors dede insertar al director de la pelicula', async () => {
    const director =await Director.create({
        firstName: "Oscar",
        lastName: "Uriando",
        nationality: "Ecuatoriano",
        image: "http://guapo:8080",
        birthday: "1990-11-03"
    });
    const res = await request(app).post(`/movies/${id}/directors`).send([director.id]);
    await director.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('POST /movies/:id/actors dede insertar a los actores de la pelicula', async () => {
    const actor = await Actor.create({
        firstName: "Paula",
        lastName: "Villa Nueva",
        nationality: "Argrntina",
        image: "http://guapo:8080",
        birthday: "1990-11-03"
    });
    const res = await request(app).post(`/movies/${id}/actors`).send([actor.id]);
    await actor.destroy();
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBe(1)
});

test('DELET /movies/:id de eliminar una pelicula', async () => {
    const res = await request(app).delete('/movies/'+id);
    expect(res.status).toBe(204);
});