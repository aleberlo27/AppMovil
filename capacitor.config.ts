import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'login',
  webDir: 'www',
  android: {
    allowMixedContent: true
  }
};

export default config;
