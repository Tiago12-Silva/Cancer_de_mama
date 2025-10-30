const sequelize = require('./config/database'); 
const Meta = require('./models/Meta');

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log('🟢 Conexão com o banco estabelecida com sucesso.');

    await sequelize.sync({ force: false });
    console.log('📦 Tabelas sincronizadas com sucesso.');
  } catch (error) {
    console.error('🔴 Erro ao sincronizar o banco:', error);
  } finally {
    await sequelize.close();
    console.log('🔒 Conexão encerrada.');
  }
}

syncDatabase();