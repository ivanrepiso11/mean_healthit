import app from './app';
import { conexionBd } from "./database";

async function main() {
    conexionBd();
    await app.listen(app.get('port'));
    console.log('Server on port', app.get('port'));
}

main();