import { useState, useEffect } from 'react';
import { submitInfo } from '../api/endpoints/party';
import { create } from 'domain';

export const useSubmitInfo = () => {
    const [response, setResponse] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);
    
    const createParty = async (data: any) => {
        setLoading(true);
        setError(null);
        setResponse(null);
        try {
            const response = await submitInfo(data);
            setResponse(response.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    }

    return { createParty, loading, error, response };
}