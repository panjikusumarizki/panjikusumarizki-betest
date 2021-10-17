var seeder = require('mongoose-seed');
var mongoose = require('mongoose');
const {DB_CONNECT} = process.env

// Connect to MongoDB via Mongoose
seeder.connect(`${DB_CONNECT}`, {}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Users',
    './models/RefreshToken'
  ]);

  // Clear specified collections
  seeder.clearModels(['User', 'RefreshToken'], function () {

    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
    });

  });
});

var data = [
  {
    'model': 'User',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc903345'),
        userName: 'jaja',
        accountNumber: 123456,
        emailAddress: 'jaj@mail.com',
        identityNumber: 5481
      }
    ]
  },
  {
    'model': 'RefreshToken',
    'documents': [
      {
        _id: mongoose.Types.ObjectId('5e96cbe292b97300fc654231'),
        token: 'rtiweutnl89er9jln',
        user_id: '5e96cbe292b97300fc903345'
      }
    ]
  }
];
