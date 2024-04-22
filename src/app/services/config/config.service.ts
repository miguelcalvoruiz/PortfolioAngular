import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configData: any;
  private configLoaded: Promise<void>;

  constructor(private http: HttpClient) {
    this.configLoaded = this.loadConfigData();
  }

  private async loadConfigData(): Promise<void> {
    try {
      this.configData = await this.http.get('assets/config.json').toPromise();
    } catch (error) {
      console.error('Error loading configuration data:', error);
    }
  }  

  async getConfigValue(path: string): Promise<any> {
    await this.configLoaded;
    const value = path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), this.configData);
    return value;
  }
  
}
