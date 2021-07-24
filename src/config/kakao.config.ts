import { registerAs } from '@nestjs/config';

export interface KakaoConfig {
  restApiKey: string;
  url: string;
}

export default registerAs('kakao', (): KakaoConfig => {
  return {
    restApiKey: process.env.KAKAO_REST_API_KEY,
    url: process.env.KAKAO_URL,
  };
});
