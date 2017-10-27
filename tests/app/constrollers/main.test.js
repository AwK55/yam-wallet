
const app = require('../../../app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;


describe('Controllers', () => {
  const server = app.listen();
  after(function () {
    server.close();
  });

  it('GET / should render the index', async function () {
    const res = await request(server).get('/');

    expect(res.text).to.be.not.empty;
    expect(res.statusCode).to.be.eq(200);

  });
  
});
