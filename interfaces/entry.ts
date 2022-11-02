


export interface Entry {
    _id: string;
    nombre: string;
    apellido: string;
    email: string;
    description: string;
    createdAt: number;
    status: EntryStatus;
}

export type EntryStatus = 'pending' | 'in-progress' | 'finished';