export interface IEnvironment {
    production: boolean;
    dbHost: string;
    dbPort: number;
    dbName: string;
    dbUsername: string;
    dbPassword: string;
    logging: boolean;
}
