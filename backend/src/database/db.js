import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('SoloObraDB', 'postgres', '8520', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5433
});

export default sequelize;