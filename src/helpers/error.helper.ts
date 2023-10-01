import { AxiosError } from 'axios';

export const ErrorHelper = {
    getError(err: AxiosError): string {
        /* TODO: PARSE ERROR DATA */
        return (
            (err.response?.data as string) || err.message || 'INTERNAL ERROR!'
        );
    },
};
