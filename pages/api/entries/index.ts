import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models';
;


type Data = 
    | { message: string }
    | IEntry[]
    | IEntry

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    
    switch ( req.method ) {
        case 'GET':
            return getEntries( res );

        case 'POST':
            return postEntry( req, res );
        
    
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


const postEntry = async( req: NextApiRequest, res: NextApiResponse<Data> ) => {

    res.setHeader('Access-Control-Allow-Credentials', "true")
    res.setHeader('Access-Control-Allow-Origin', '*')
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    )

    const { 
        nombre = '',
        apellido = '',
        email = '',
        description = ''
     } = req.body;

    const newEntry = new Entry({
        nombre,
        apellido,
        email,
        description,
        createdAt: Date.now(),
    });


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