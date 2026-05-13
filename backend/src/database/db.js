import { Sequelize } from 'sequelize';


const sequelize = new Sequelize('SoloObraDB', 'postgres', '123', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});

export default sequelize;