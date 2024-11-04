import apiClient from "../client";

export const submitInfo = (data: any) =>
    apiClient.post('/party', data);