import { registerAs } from '@nestjs/config';

export interface MqttConfig {
  applicationId: string;
  address: string;
  tlsAddress: string;
  apiKey: string;
  username: string;
  password: string;
}

export default registerAs('mqtt', (): MqttConfig => {
  return {
    applicationId: process.env.MQTT_APPLICATION_ID,
    address: process.env.MQTT_PUBLIC_ADDRESS,
    tlsAddress: process.env.MQTT_PUBLIT_TLS_ADDRESS,
    apiKey: process.env.MQTT_API_KEY,
    username: process.env.MQTT_USERNAME,
    password: process.env.MQTT_PASSWORD,
  };
});
