export const getAccessTokenCacheKey = (token: string) => {
    return `access_token:${token}`;
}