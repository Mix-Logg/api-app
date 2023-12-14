import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'mysql',
        host: 'db-test-do-user-15124696-0.c.db.ondigitalocean.com',
        port: 25060,
        username: 'doadmin',
        password: 'AVNS_qetteE6jvV3iQswf6hQ',
        database: 'mix_teste',
        entities: [__dirname + '/../**/*.entity{.ts,.js}',],
        synchronize: true, 
        // synchronize: false, production
      });
      

      return dataSource.initialize();
    },
  },
];