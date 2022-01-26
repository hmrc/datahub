/*
   Default top-level page route names (excludes entity pages)
*/
export enum PageRoutes {
    /**
     * Server-side authentication route
     */
    AUTHENTICATE = '/data-catalogue/authenticate',
    LOG_IN = '/data-catalogue/login',
    SEARCH_RESULTS = '/data-catalogue/search/:type?',
    SEARCH = '/data-catalogue/search',
    BROWSE = '/data-catalogue/browse',
    BROWSE_RESULTS = '/data-catalogue/browse/:type',
    DATASETS = '/data-catalogue/datasets',
    ASSETS = '/data-catalogue/assets',
    ANALYTICS = '/data-catalogue/analytics',
    POLICIES = '/data-catalogue/policies',
    IDENTITIES = '/data-catalogue/identities',
    SETTINGS = '/data-catalogue/settings',
}

/**
 * Name of the auth cookie checked on client side (contains the currently authenticated user urn).
 */
export const CLIENT_AUTH_COOKIE = 'actor';

/**
 * Name of the unique browser id cookie generated on client side
 */
export const BROWSER_ID_COOKIE = 'bid';
