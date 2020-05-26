import { connect } from "mongoose";
const bd = 'healthit_bd';

export async function conexionBd() {
    await connect('mongodb://localhost/' + bd, 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    });
    console.log('Conexion correcta a ' + bd);
}