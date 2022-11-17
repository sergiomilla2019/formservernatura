


export interface Entry {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    fecha: Date;
    check1: String;
    check2: String;
    site: string;
    createdAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';