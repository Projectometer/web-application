import { AxiosError, AxiosResponse } from 'axios';
import { ErrorHelper } from 'src/helpers';

export async function TRequestHandler<T = unknown>(
    result: Promise<AxiosResponse<T>>
): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        result
            .then((res: AxiosResponse<T>) => resolve(res.data))
            .catch((err: AxiosError) => {
                console.error('Request handler', err);
                reject(ErrorHelper.getError(err));
            });
    });
}
