const cardCollection = require('../../../app/models/card/cardCollection');
const sinon = require('sinon')

beforeEach(function () {
  this.sandbox = sinon.sandbox.create()
})

afterEach(function () {
  this.sandbox.restore()
})

 
describe("cardCollection", function(){  
  it("retrieves by id", function(done){    
    cardCollection.findByEmail('test@test.com', function(doc){      
      doc.email.should.equal('test@test.com');       
      done();    
    });  
  });
});