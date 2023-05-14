
const baseURL = "https://api.green-api.com";

type AuthTypes = {
    id: number | null;
    apiToken: string | null;
    isAuthenticated?: boolean;
}

const Endpoints = {
    baseURL,
    setProfilePicture: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/setProfilePicture/${apiToken}`,
    logout: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/Logout/${apiToken}`,
    sendMessage: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/SendMessage/${apiToken}`,
    createChat: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/GetSettings/${apiToken}`,
    accountStatus: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/getStateInstance/${apiToken}`,
    receiveNotifications: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/ReceiveNotification/${apiToken}`,
    deleteNotification: ({ id, apiToken, receiptId }: AuthTypes & { receiptId: number }): string => `${baseURL}/waInstance${id}/DeleteNotification/${apiToken}/${receiptId}`,
    getChatHistory: ({ id, apiToken }: AuthTypes): string => `${baseURL}/waInstance${id}/GetChatHistory/${apiToken}`,
}


export default Endpoints
