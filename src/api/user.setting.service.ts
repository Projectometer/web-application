import { CalenderOptionsData, UserProfile } from 'src/types';
import { TRequestHandler } from './service.helper';
import { api } from 'src/boot/axios';
import ApiUrl from './api.url';
import { useAuthStore } from 'src/stores/AuthStore';

export default {
    saveSetting,
    loadSetting,
    loadProfile,
    loadProfileImage,
    getActiveTimers,
    startActiveTimers,
    stopActiveTimers,
};

async function saveSetting(
    option: CalenderOptionsData
): Promise<CalenderOptionsData> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<CalenderOptionsData>(
        api.post(ApiUrl['Setting'], { settings: option })
    );
}
async function loadSetting(): Promise<{ settings: CalenderOptionsData }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ settings: CalenderOptionsData }>(
        api.get(ApiUrl['Setting'])
    );
}
async function loadProfile(): Promise<UserProfile> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<UserProfile>(api.get(ApiUrl['Profiles.profile']));
}
function loadProfileImage(): string {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return `${ApiUrl['Profiles.profile.image']}?token=${useAuthStore().token}`;
}
async function getActiveTimers(): Promise<{ started_at: string } | null> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ started_at: string } | null>(
        api.get(ApiUrl['active-timers'])
    );
}
async function startActiveTimers(
    timestamp = +new Date()
): Promise<{ started_at: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ started_at: string }>(
        api.post(ApiUrl['active-timers'] + `/${timestamp}`)
    );
}
async function stopActiveTimers(): Promise<{ started_at: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ started_at: string }>(
        api.delete(ApiUrl['active-timers'])
    );
}
