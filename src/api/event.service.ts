import { CalenderEvent, ReportType } from 'src/types';
import { TRequestHandler } from './service.helper';
import { api } from 'src/boot/axios';
import ApiUrl from './api.url';
import { today } from '@quasar/quasar-ui-qcalendar';
import { useAuthStore } from 'src/stores/AuthStore';

export default {
    saveEvent,
    editEvent,
    loadEvents,
    deleteEvent,
    loadTags,
    createTag,
    loadCompanies,
    createCompanies,
    deleteCompanies,
    loadProjects,
    createProjects,
    deleteProjects,
    createTags,
    deleteTags,
    search,
};
async function saveEvent(data: CalenderEvent): Promise<CalenderEvent> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<CalenderEvent>(
        api.post(ApiUrl['Events'], {
            ...data,
            bg_color: data.bgcolor,
            all_day: data.allDay,
            days: data.days ?? 0,
            icon: data.icon ?? 's',
            start: undefined,
            allDay: undefined,
            bgcolor: undefined,
            id: undefined,
            side: undefined,
            user_id: undefined,
        })
    );
}
async function editEvent(
    data: CalenderEvent,
    user_id = 'test'
): Promise<CalenderEvent> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<CalenderEvent>(
        api.patch(`${ApiUrl['Events']}${user_id}/${data.id}`, {
            ...data,
            date: data.start,
            bg_color: data.bgcolor,
            all_day: data.allDay,
            days: data.days ?? 0,
            start: undefined,
            allDay: undefined,
            bgcolor: undefined,
            id: undefined,
            side: undefined,
            user_id: undefined,
        })
    );
}
async function loadEvents(
    start = today(),
    end = today()
): Promise<CalenderEvent[]> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<CalenderEvent[]>(
        api.get(`${ApiUrl['Events']}${start}/${end}`)
    );
}
async function deleteEvent(id: string): Promise<{ Events: CalenderEvent[] }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ Events: CalenderEvent[] }>(
        api.delete(`${ApiUrl['Events']}${id}`)
    );
}
async function loadTags(): Promise<string[]> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<string[]>(api.get(ApiUrl['tags']));
}
async function createTag(
    title: string
): Promise<{ id: string; title: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ id: string; title: string }>(
        api.post(ApiUrl['tags'], { title, description: '' })
    );
}

async function loadCompanies(): Promise<{ id: string; title: string }[]> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ id: string; title: string }[]>(
        api.get(ApiUrl['companies'])
    );
}
async function createCompanies(
    title: string,
    description?: string,
    id?: string
): Promise<{ id: string; title: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    if (id) {
        return TRequestHandler<{ id: string; title: string }>(
            api.patch(ApiUrl['companies'] + '/' + id, { title, description })
        );
    }
    return TRequestHandler<{ id: string; title: string }>(
        api.post(ApiUrl['companies'], { title, description })
    );
}
async function deleteCompanies(
    id: string
): Promise<{ id: string; title: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;

    return TRequestHandler<{ id: string; title: string }>(
        api.delete(ApiUrl['companies'] + '/' + id)
    );
}
async function loadProjects(): Promise<{ id: string; title: string }[]> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<{ id: string; title: string }[]>(
        api.get(ApiUrl['projects'])
    );
}
async function createProjects(
    title: string,
    description?: string,
    id?: string
): Promise<{ id: string; title: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    if (id) {
        return TRequestHandler<{ id: string; title: string }>(
            api.patch(ApiUrl['projects'] + '/' + id, { title, description })
        );
    }
    return TRequestHandler<{ id: string; title: string }>(
        api.post(ApiUrl['projects'], { title, description })
    );
}
async function deleteProjects(
    id: string
): Promise<{ id: string; title: string }> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;

    return TRequestHandler<{ id: string; title: string }>(
        api.delete(ApiUrl['projects'] + '/' + id)
    );
}
async function createTags(title: string): Promise<string> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    return TRequestHandler<string>(api.post(ApiUrl['tags'], { tags: [title] }));
}
async function deleteTags(item: string): Promise<string> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    // api.defaults.data = { tags: [item] };
    return TRequestHandler<string>(
        api.patch(ApiUrl['tags'] + '/remove', { tags: [item] })
    );
}

async function search(data: ReportType): Promise<CalenderEvent[]> {
    api.defaults.headers.common['Authorization'] =
        'Bearer ' + useAuthStore().token;
    const searchData = {
        start_date:
            data.start_date != '' ? new Date(data.start_date) : undefined,
        end_date: data.start_date != '' ? new Date(data.start_date) : undefined,
        title: data.title != '' ? data.title : undefined,
        project_id: data.project_id != '' ? data.project_id : undefined,
        company_id: data.company_id != '' ? data.company_id : undefined,
    };
    return TRequestHandler<CalenderEvent[]>(
        api.post(ApiUrl['event.query'], searchData)
    );
}
