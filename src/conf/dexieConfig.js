import Dexie from 'dexie';

const db = new Dexie('CitasDatabase');
db.version(1).stores({
  citas: '++id, mascota, propietario, fecha, hora, sintomas',
});

export default db;
