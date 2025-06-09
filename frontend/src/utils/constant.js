export const HOST = 'http://localhost:3001';

export const AUTH_ROUTES = `/api/auth`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const GET_USER_INFO_ROUTE = `${AUTH_ROUTES}/get-user-info`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;

// Pet Routes
export const PET_ROUTES = `/api/pets`;
export const ADD_PET_ROUTE = `${PET_ROUTES}/add-pet`;
export const DELETE_PET_ROUTE = `${PET_ROUTES}/delete-pet/:id`;
export const GET_ALL_PETS_ROUTE = `${PET_ROUTES}/get-all-pets`;
export const GET_PET_BY_ID_ROUTE = `${PET_ROUTES}/get-pet-by-id/:id`;

// User Routes
export const USER_ROUTES = `/api/users`;
export const GET_LIST_USER_ROUTE = `${USER_ROUTES}/list-user`;
export const ADD_USER_ROUTE = `${USER_ROUTES}/add-user`;
export const UPDATE_USER_ROUTE = `${USER_ROUTES}/update-user`;
export const DELETE_USER_ROUTE = `${USER_ROUTES}/delete-user`;

// Service Routes
export const SERVICE_ROUTES = `/api/services`;
export const GET_LIST_SERVICE_ROUTE = `${SERVICE_ROUTES}/list-service`;
export const ADD_SERVICE_ROUTE = `${SERVICE_ROUTES}/add-service`;
export const UPDATE_SERVICE_ROUTE = `${SERVICE_ROUTES}/update-service`;
export const DELETE_SERVICE_ROUTE = `${SERVICE_ROUTES}/delete-service`;

// Media Record Routes
export const MEDIA_RECORD_ROUTES = `/api/media-records`;
export const GET_LIST_MEDIA_RECORD_ROUTE = `${MEDIA_RECORD_ROUTES}/list-media-record`;
export const ADD_MEDIA_RECORD_ROUTE = `${MEDIA_RECORD_ROUTES}/add-media-record`;
export const DELETE_MEDIA_RECORD_ROUTE = `${MEDIA_RECORD_ROUTES}/delete-media-record`;