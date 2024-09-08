declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production' | 'test';
        LOKI_USERNAME: string;
        LOKI_PASSWORD: string;
        LOKI_HOST: string;
        LOKI_APP: string;
        LOKI_JOB: string;
    }
}