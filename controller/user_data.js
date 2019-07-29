const User = require('modals/user_data');
const _ = require('lodash');


class UserData {
	static process(req, res) {
		let data = _.pick(req.user._json, ['id_str', 'name', 'url', 'location', 'status']);
		User.create(data)
		 .then((x) =>{
		 	console.log('values inserted', x);
		 	res.render('search')
		 })
		 .catch(err => console.log(err))
	}
}

module.exports = {
    UserData: UserData
}