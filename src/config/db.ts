import { Sequelize } from 'sequelize-typescript'
import dotenv from 'dotenv'

dotenv.config()

export const db = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST as string,
        dialect: 'postgres',
        port: Number(process.env.DB_PORT),
        logging: false,
        models: [__dirname + '/../models/**/*.ts'],
        dialectOptions: {
            ssl: {
                require: true,
                // Con esta opción, se omite la verificación del certificado.
                // Para entornos de producción, es recomendable validar el certificado correctamente.
                rejectUnauthorized: false,
            },
        },
    }
)