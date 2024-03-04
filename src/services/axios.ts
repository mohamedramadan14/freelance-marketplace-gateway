import axios from 'axios';
import jwt from 'jsonwebtoken';
import { config } from '@gateway/config';

export class AxiosService {
  public axios: ReturnType<typeof axios.create>;
  constructor(baseUrl: string, serviceName: string) {
    this.axios = this.createAxiosInstance(baseUrl, serviceName);
  }

  public createAxiosInstance(baseUrl: string, serviceName?: string): ReturnType<typeof axios.create> {
    let requestGatewayToken = '';
    if (serviceName) {
      requestGatewayToken = jwt.sign({ id: serviceName }, `${config.GATEWAY_JWT_TOKEN}`);
    }
    const axiosInstance: ReturnType<typeof axios.create> = axios.create({
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        gatewayToken: requestGatewayToken
      },
      withCredentials: true // for cookies
    });
    return axiosInstance;
  }
}
