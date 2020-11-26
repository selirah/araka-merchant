import axios, { AxiosResponse } from 'axios';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;

export async function callApiGet(path: string): Promise<AxiosResponse> {
  return await axios.get(`${API_ENDPOINT}/api/${path}`);
}

export async function callApiPost(
  path: string,
  payload: any
): Promise<AxiosResponse> {
  return await axios.post(`${API_ENDPOINT}/api/${path}`, payload);
}

export async function callApiPostQueryParams(
  path: string,
  payload: any
): Promise<AxiosResponse> {
  return await axios.post(`${API_ENDPOINT}/api/${path}`, null, {
    params: payload,
  });
}
