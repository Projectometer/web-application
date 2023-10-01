export type AuthData = {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    ext_expires_in: number;
    scope: string;
    token_type: string;
    [key: string]: unknown;
};
export type ProfileData = {
    [key: string]: unknown;
};

export type AuthState = {
    auth: null | AuthData;
    profile: null | ProfileData;
    token: string | null;
};
export interface UserProfile {
    username: string;
    displayName: string;
    givenName: string;
    jobTitle: string;
    businessPhones: string;
    mail: string;
    mobilePhone: string;
    officeLocation: string;
    preferredLanguage: string;
    surname: string;
    userPrincipalName: string;
    id: string;
    userImage: string;
}
