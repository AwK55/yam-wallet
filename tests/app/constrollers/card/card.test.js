process.env.NODE_ENV = 'test';

const request = require('supertest');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');


const app = require('../../../../app');
const cardService = require('../../../../app/services/cardService');


// describe("GET Cards", function () {

//       it("should respond", function () {
//         var ctx = {};
//         const getCardListSpy = sinon.spy(cardService, 'getCardsList');
//         card.getCards(ctx);
//         expect(getCardListSpy.calledOnce).to.equal(true);
//       });

//     });
//   });
describe('Controllers', () => {
  describe('Cards', function () {
    const server = app.listen();
    after(function () {
      server.close();
    });

    it('Get all cards with GET /cards/ ', async function () {

      const res = await request(server)
        .get('/cards')
        .set('Accept', 'application/json')
        .expect('Content-Type', /json/);


      expect(res.statusCode).to.be.eq(200);
      expect(res.body).to.be.an('array');
      expect(res.body).to.be.not.empty;
    });

    describe('Create card with POST /cards/', () => {
      const data = {
        "cardNumber": "4916786189900425",
        "balance": 0
      };
      sinon.stub(cardService, "create")
        .callsFake((data) => {
          return true;
        });

      after(function () {
        cardService.create.restore();
      });

      it('should pass validation', async function () {
        const res = await request(server)
          .post('/cards/')
          .send(data)
          .set('Accept', 'application/json');

        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.be.true;
      });

      it('should pass validation with redundant keys', async function () {
        const testData = Object.assign({ redundant: true }, data);
        const res = await request(server)
          .post('/cards/')
          .send(testData)
          .set('Accept', 'application/json');

        expect(res.statusCode).to.be.eq(200);
        expect(res.body).to.be.true;
      });

      it('should return error validation', async function () {
        const res = await request(server)
          .post('/cards/')
          .send({})
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details[1].message).to.be.eq('"balance" is required');
        expect(res.body.details[0].message).to.be.eq('"cardNumber" is required');
        expect(res.statusCode).to.be.eq(404);
      });

      it('should return "cardNumber should be a credit card" error', async function () {

        const res = await request(server)
          .post('/cards/')
          .send({ "cardNumber": "0000", "balance": 0 })
          .set('Accept', 'application/json');

        expect(res.body.name).to.be.eq('ValidationError');
        expect(res.body.details).to.be.exist;
        expect(res.body.details[0].message).to.be.eq('"cardNumber" must be a credit card');
        expect(res.statusCode).to.be.eq(404);
      });
    });

  });
});
