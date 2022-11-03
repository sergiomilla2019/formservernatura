import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
import NextCors from 'nextjs-cors';




type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getEntries( res );

        case 'POST':
            return handlertest( req, res );
        
    
        default:
            return res.status(400).json({ message: 'Endpoint no existe' });
    }
}


const getEntries = async( res: NextApiResponse<Data> ) => {

    await db.connect();
    const entries = await Entry.find().sort({ createdAt: 'ascending' });
    await db.disconnect();

    return res.status(200).json( entries );
}


async function handlertest(req: NextApiRequest, res: NextApiResponse<Data>) {
    // Run the cors middleware
    // nextjs-cors uses the cors package, so we invite you to check the documentation https://github.com/expressjs/cors
    await NextCors(req, res, {
       // Options
       methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
       origin: '*',
       optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
 
    // Rest of the API logic
    //res.json({ message: 'Hello NextJs Cors!' });

    const obj = JSON.parse(req.body);
    const { 
        nombre = '',
        apellido = '',
        email = '',
        description = 'Description'
     } = obj;

     
     console.log(JSON.parse(req.body))

    const newEntry = new Entry({
        nombre,
        apellido,
        email,
        description,
        createdAt: Date.now(),
    });

    console.log({ newEntry })
    try {
        
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return res.status(200).json( newEntry );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
    }

 }

const postEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    const { 
        nombre = '',
        apellido = '',
        email = '',
        description = 'Description'
     } = req.body;

    const newEntry = new Entry({
        nombre,
        apellido,
        email,
        description,
        createdAt: Date.now(),
    });

    console.log(newEntry)
    try {
        
        await db.connect();
        await newEntry.save();
        await db.disconnect();

        return res.status(200).json( newEntry );
        
    } catch (error) {
        await db.disconnect();
        console.log(error);
        return res.status(500).json({ message: 'Algo salio mal, revisar consola del servidor' });
    }

}