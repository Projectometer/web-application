export const AUTH_CALLBACK_URL = `https://pjtmtr.de/auth/callback`;
export const AUTH_SERVICE_URL =  `https://pjtmtr.de/api/v1/auth-service/`;
export const BASE_SERVICE_URL =  `https://pjtmtr.de/api/v1/auth-service/`;

console.log({
    AUTH_SERVICE_URL,
    AUTH_CALLBACK_URL,
    BASE_SERVICE_URL,
});

const routes = {
    signIn: `${AUTH_SERVICE_URL}auth/sign-in`,
    Events: `${BASE_SERVICE_URL}events/`, // :id
    'event.query': `${BASE_SERVICE_URL}events/query`,
    Setting: `${BASE_SERVICE_URL}settings/`, //:id
    'Profiles.profile': `${BASE_SERVICE_URL}profiles/pofile`, //:id
    'Profiles.profile.image': `${BASE_SERVICE_URL}profiles/pofile-image`, //:token
    'active-timers': `${BASE_SERVICE_URL}active-timers`,
    tags: `${BASE_SERVICE_URL}tags`,
    companies: `${BASE_SERVICE_URL}companies`,
    projects: `${BASE_SERVICE_URL}projects`,
};
export default routes;
