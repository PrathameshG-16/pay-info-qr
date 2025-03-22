
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.a21d4c3dd085414eadcbc80f5abffb9d',
  appName: 'pay-info-qr',
  webDir: 'dist',
  server: {
    url: 'https://a21d4c3d-d085-414e-adcb-c80f5abffb9d.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0
    }
  }
};

export default config;
