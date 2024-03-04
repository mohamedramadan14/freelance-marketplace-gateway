import { winstonLogger, Level } from '@mohamedramadan14/freelance-shared';
import { Logger } from 'winston';
import { config } from '@gateway/config';
import { Client } from '@elastic/elasticsearch';
import { ClusterHealthResponse } from '@elastic/elasticsearch/lib/api/types';

const logger: Logger = winstonLogger(`${config.ELASTICSEARCH_URL}`, 'API Gateway ElasticSearch', Level.debug);

class ElasticSearch {
  private elasticsearchClient: Client;

  constructor() {
    this.elasticsearchClient = new Client({
      node: `${config.ELASTICSEARCH_URL}`
    });
  }

  public async createConnection(): Promise<void> {
    let isConnected = false;
    logger.info('Gateway Service - Creating connection to ElasticSearch...');
    while (!isConnected) {
      try {
        const health: ClusterHealthResponse = await this.elasticsearchClient.cluster.health({});
        logger.info(`Gateway Service - Connected to ElasticSearch is ${health.status}`);
        isConnected = true;
      } catch (error) {
        logger.error('Gateway Service - Failed to connect to ElasticSearch. Retrying.....');
        logger.log('error', 'Gateway Service - Failed to connect to ElasticSearch. call: createConnection()', error);
      }
    }
  }
}

export const elasticsearch: ElasticSearch = new ElasticSearch();
