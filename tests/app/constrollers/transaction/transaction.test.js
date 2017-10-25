//const routes = require('../../app/middlewares/routes');
const app = require('../../../../app');
const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


const transactionService = require('../../../../app/services/transactionService');

describe('Controllers', () => {
  describe('Transactions', () => {
    const server = app.listen();
    after(function () {
      server.close();
    });

    it('get all transactions with GET /transactions/', async function () {

      const res = await request(server)
        .get('/transactions')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.statusCode).to.be.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.not.empty;

      const transaction = res.body[0];
      expect(transaction).have.property('id');
      expect(transaction).have.property('sum');
      expect(transaction).have.property('cardId');
      expect(transaction).have.property('time');
      expect(transaction).have.property('type');
    });
    it('get transactions of card with id = 1 GET /cards/:id/transactions/ ', async function () {

      //   {
      //     "id": 39,
      //     "data": {
      //         "phoneNumber": "+79218908064"
      //     },
      //     "sum": -103,
      //     "cardId": 1,
      //     "time": "2017-10-18T08:59:14.936Z",
      //     "type": "paymentMobile"
      // }

      const id = 1;
      const res = await request(server)
        .get(`/cards/${id}/transactions/`)
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);

      expect(res.statusCode).to.be.eq(200);
      expect(res.body).to.be.not.empty;
      expect(res.body).to.be.an('array');

    });

    it('should return error with not exist cardId GET /cards/:id/transactions/ ', async function () {

      const id = -1;
      const res = await request(server)
        .get(`/cards/${id}/transactions/`)
        .set('Accept', 'application/json')
        .expect(404);

      expect(res.statusCode).to.be.eq(404);
      expect(res.error).to.be.not.empty;
      expect(res.error.text).to.be.eq('Card not found');

    });

    describe('Create pay transaction with POST /cards/:id/pay/', () => {
      const data = {
        "phoneNumber": "+79218908064",
        "sum": 1
      }
      sinon.stub(transactionService, "create")
        .callsFake((data) => {
          return true;
        });

      after(function () {
        transactionService.create.restore();
      });

      it('should pass validation', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/pay/`)
          .send(data)
          .set('Accept', 'application/json');

        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.be.true;
      });
      it('should return error with NaN cardId', async function () {
        const id = 'test';
        const res = await request(server)
          .post(`/cards/${id}/pay/`)
          .send(data)
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"cardId" must be a number');
        expect(res.statusCode).to.be.eq(404);
      });

      it('should return error with negative sum', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/pay/`)
          .send({ "phoneNumber": "+79218908064", "sum": 0 })
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"sum" must be a positive number');
        expect(res.statusCode).to.be.eq(404);
      });

      it('should return error with invalid phone number', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/pay/`)
          .send({ "phoneNumber": "+19208064", "sum": 1 })
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.contain('fails to match the required pattern');
        expect(res.statusCode).to.be.eq(404);
      });
    });

    describe('Create transfer transaction with POST /cards/:id/transfer/', () => {
      const data = {
        "target": "2",
        "sum": 1
      }
      sinon.stub(transactionService, "transfer")
        .callsFake((data) => {
          return true;
        });

      after(function () {
        transactionService.transfer.restore();
      });

      it('should pass validation', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/transfer/`)
          .send(data)
          .set('Accept', 'application/json');

        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.be.true;
      });
      it('should return error with NaN cardId', async function () {
        const id = 'test';
        const res = await request(server)
          .post(`/cards/${id}/transfer/`)
          .send(data)
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"cardId" must be a number');
        expect(res.statusCode).to.be.eq(404);
      });

      it('should return error with negative sum', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/transfer/`)
          .send({ "target": "2", "sum": 0 })
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"sum" must be a positive number');
        expect(res.statusCode).to.be.eq(404);
      });

      it('should return error with invalid target Id', async function () {
        const id = 1;
        const res = await request(server)
          .post(`/cards/${id}/transfer/`)
          .send({ "target": "test", "sum": 1 })
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"target" must be a number');
        expect(res.statusCode).to.be.eq(404);
      });
    });
  });
});
