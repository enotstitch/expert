import dotenv from "dotenv";
dotenv.config();

export let configFTP = {
	host: process.env.FTP_HOST,
	user: process.env.FTP_USER,
	password: process.env.FTP_PASS,
	parallel: 10, // * Кол-во одновременных потоков
};
