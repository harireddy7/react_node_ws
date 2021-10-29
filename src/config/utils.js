export const getServerBaseUrl = () => {
    const env = process.env.REACT_APP_NODE_ENV;

    if (env === 'development') {
        return {
            API_BASE_URl: 'http://localhost:8080/api/v1',
            WS_BASE_URL: 'http://localhost:8080'
        }
    }
    return {
        API_BASE_URl: `${window.location.origin}/api/v1`,
        WS_BASE_URL: window.location.origin
    }
}