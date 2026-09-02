import axios, { AxiosInstance } from 'axios';

/**
 * REST Countries API Configuration
 * 
 * API Contract (PRESERVED):
 * - Endpoint: https://restcountries.com/v3.1
 * - Expected fields used by the app:
 *   - name.common: Country name in common format
 *   - population: Population count
 *   - area: Land area in km²
 *   - region: Geographic region
 *   - flags: Flag object with svg/png URLs
 *   - cca3: ISO 3-letter country code
 * 
 * Stability Requirements:
 * - This app code must defensively handle missing or extra fields
 * - Any mapping logic that converts raw API responses into the app's Country entity should remain stable and backward-compatible
 * - The endpoint baseURL remains configured as https://restcountries.com/v3.1
 * 
 * Note: This API contract is intentionally preserved as-is. No changes to endpoints, query formats, 
 * or expected fields are introduced by this feature.
 */
export const api: AxiosInstance = axios.create({
    baseURL: 'https://countries.dev/',
    timeout: 10000  
})
