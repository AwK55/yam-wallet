'use strict'
const cardCollection = require('../models/card/cardCollection')();

module.exports = {
	async create(ctx) {
		//алгоритм Луна duplicate
		//validateCard(callback add Card) 
		
		const card = ctx.request.body[0];
		const result = await cardCollection.add(card);
		
		ctx.body = result;
		
	},
	async delete(ctx) {
		
		
		if (ctx.params.id) {
			let n =  parseInt(ctx.params.id);
			let result = await cardCollection.remove(n)

			ctx.body = result;
			
			// fs.writeFile("./source/cards.json", JSON.stringify(cards), (err) => {
			// 	if (err) {
			// 		console.error('cards not added', err.code);
			// 		throw err;
			// 	}
				
			// });
		} else {
			ctx.response.status(404);
			ctx.response.write('Not found!');
		}
	},
	async getCards(ctx) {

		let cards = await cardCollection.getAll();
		ctx.body = cards;
    }
    
    // async transer(ctx) {
    //     const {
	// 		amount,
	// 		from,
	// 		to
	// 	} = req.query;
	// 	ctx.json({
	// 		result: 'success',
	// 		amount,
	// 		from,
	// 		to
	// 	});
    // }
}
