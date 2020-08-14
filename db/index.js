const Sequelize = require('sequelize');
const { STRING, INTEGER } = Sequelize;
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_db');

const Friend = conn.define('friend', {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    },
    unique: true
  },
  rating: {
    type: INTEGER,
    defaultValue: 5,
    allowNull: false
  }
});

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, larry, lucy] = await Promise.all([
    Friend.create({ name: 'moe', rating: 10 }),
    Friend.create({ name: 'larry', rating: 1 }),
    Friend.create({ name: 'lucy'})
  ]);
};


module.exports = {
  models: {
    Friend
  },
  syncAndSeed
};
