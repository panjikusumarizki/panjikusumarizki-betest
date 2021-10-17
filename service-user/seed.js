var seeder = require('mongoose-seed');
var mongoose = require('mongoose');

// Connect to MongoDB via Mongoose
seeder.connect('mongodb://localhost:27017/db_panjikusumarizki_betest', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
}, function () {

  // Load Mongoose models
  seeder.loadModels([
    './models/Users'
  ]);

  // Clear specified collections
  seeder.clearModels(['User'], function () {

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
