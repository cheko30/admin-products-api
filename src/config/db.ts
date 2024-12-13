import { Sequelize } from "sequelize";

const connection = 'postgresql://rest_api_products_r64o_user:BTjEH5f5NXeKzSa3iDp0zmhw7RuDy2gs@dpg-ctds57dumphs739802l0-a.oregon-postgres.render.com/rest_api_products_r64o?ssl=true'

const db = new Sequelize(connection)

export default db