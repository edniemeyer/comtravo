import dotenv from 'dotenv'
dotenv.config()

export const PORT = 8080 || process.env.PORT;
export const API_URL = process.env.API_URL;
export const API_USERNAME = process.env.API_USERNAME;
export const API_PASSWORD = process.env.API_PASSWORD;