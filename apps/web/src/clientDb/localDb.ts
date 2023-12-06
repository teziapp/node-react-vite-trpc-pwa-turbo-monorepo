import Dexie from 'dexie';

export type T_TableDataType ={
  // pg: T_Select_Og;
  // project: T_Select_Project;
}

export const localdbStoresObj = {
  // og: '++id, updated_at', // Primary key and indexed props
  // project: '++id, updated_at',
};

export class LocalDbDexieClass extends Dexie {
  // We just tell the typing system this is the case
  // og!: Table<T_Select_Og>; 
  // project!: Table<T_Select_Project>;

  constructor() {
    super('subs_manager');
    this.version(1).stores(localdbStoresObj);
  }
};

export const LocalDB = new LocalDbDexieClass();