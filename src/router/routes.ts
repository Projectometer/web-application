import { RouteRecordRaw } from 'vue-router';
import {
    AuthCallbackPage,
    ErrorNotFoundPage,
    AuthLayout,
    LoginPage,
    MainLayout,
    MainPage,
    ReportsPage,
    TimerPage,
    TestPage,
    ProjectsPage,
    TagsPage,
    SettingPage,
} from './components';

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: MainLayout,
        meta: { requireAuth: true },
        children: [
            {
                path: '',
                name: 'main',
                component: MainPage,
            },
            {
                path: 'Calendar',
                component: TimerPage,
            },
            {
                path: 'Reports',
                component: ReportsPage,
            },
            {
                path: 'Project',
                component: ProjectsPage,
            },
            {
                path: 'Tags',
                component: TagsPage,
            },
            {
                path: 'Setting',
                component: SettingPage,
            },
        ],
    },
    {
        path: '/test-c',
        component: MainLayout,
        meta: { requireAuth: true },
        children: [
            {
                path: '',
                name: 'main-c',
                component: TestPage,
            },
        ],
    },
    {
        path: '/auth',
        component: AuthLayout,
        children: [
            {
                path: '',
                name: 'auth.login',
                component: LoginPage,
            },
            {
                path: 'callback',
                name: 'login-callback',
                component: AuthCallbackPage,
            },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        component: ErrorNotFoundPage,
    },
];

export default routes;
