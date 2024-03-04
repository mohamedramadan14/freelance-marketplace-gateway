import dotenv from 'dotenv';

dotenv.config({});

class Config {
  public NODE_ENV: string | undefined;
  public GATEWAY_JWT_TOKEN: string | undefined;
  public JWT_TOKEN: string | undefined;
  public SECRET_KEY_ONE: string | undefined;
  public SECRET_KEY_TWO: string | undefined;
  public CLIENT_URL: string | undefined;
  public AUTH_BASE_URL: string | undefined;
  public USERS_BASE_URL: string | undefined;
  public GIGS_BASE_URL: string | undefined;
  public MESSAGES_BASE_URL: string | undefined;
  public ORDERS_BASE_URL: string | undefined;
  public REVIEWS_BASE_URL: string | undefined;
  public REDIS_HOST: string | undefined;
  public ELASTICSEARCH_URL: string | undefined;
  public ELASTICSEARCH_APM_SERVER_URL: string | undefined;
  public ELASTICSEARCH_APM_SECRET_TOKEN: string | undefined;
  public ENABLE_APM: boolean | undefined;

  constructor() {
    this.NODE_ENV = process.env.NODE_ENV || '';
    this.GATEWAY_JWT_TOKEN = process.env.GATEWAY_JWT_TOKEN || '';
    this.JWT_TOKEN = process.env.JWT_TOKEN || '';
    this.SECRET_KEY_ONE = process.env.SECRET_KEY_ONE || '';
    this.SECRET_KEY_TWO = process.env.SECRET_KEY_TWO || '';
    this.CLIENT_URL = process.env.CLIENT_URL || '';
    this.AUTH_BASE_URL = process.env.AUTH_BASE_URL || '';
    this.USERS_BASE_URL = process.env.USERS_BASE_URL || '';
    this.GIGS_BASE_URL = process.env.GIGS_BASE_URL || '';
    this.MESSAGES_BASE_URL = process.env.MESSAGES_BASE_URL || '';
    this.ORDERS_BASE_URL = process.env.ORDERS_BASE_URL || '';
    this.REVIEWS_BASE_URL = process.env.REVIEWS_BASE_URL || '';
    this.REDIS_HOST = process.env.REDIS_HOST || '';
    this.ELASTICSEARCH_URL = process.env.ELASTICSEARCH_URL || '';
    this.ELASTICSEARCH_APM_SERVER_URL = process.env.ELASTICSEARCH_APM_SERVER_URL || '';
    this.ELASTICSEARCH_APM_SECRET_TOKEN = process.env.ELASTICSEARCH_APM_SECRET_TOKEN || '';
    this.ENABLE_APM = process.env.ENABLE_APM === 'true' || false;
  }
}

export const config: Config = new Config();
