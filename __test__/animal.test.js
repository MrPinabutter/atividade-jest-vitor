const fs = require('fs')
const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json')

describe('Criação de animais', () => {
  afterAll(() => {
    while(animalsData.length > 0) {
      animalsData.pop();
    }
    fs.writeFileSync('./src/data/animals.json', JSON.stringify(animalsData))
  })

  it('Criação do Spike', async () => {
    const res = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
    expect(res.status).toBe(201);
  })
  
  it('Criação do Mimi', async () => {
    const res = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
    expect(res.status).toBe(400);
  })
  
  it('Criação do J', async () => {
    const res = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
    expect(res.status).toBe(400);
  })
})

describe('Busca de animais', () => {
  afterAll(() => {
    while(animalsData.length > 0) {
      animalsData.pop();
    }
    fs.writeFileSync('./src/data/animals.json', JSON.stringify(animalsData))
  })

  beforeAll(async () => {
    await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
    await request(app).post('/animais?nome=Mimi&especie=Gato&idade=3');
    await request(app).post('/animais?nome=Jonas&especie=Hamster&idade=1');
  })

  it('Busca de 3 animais', async () => {

    const res = await request(app).get('/animais');
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(3);
  })
})