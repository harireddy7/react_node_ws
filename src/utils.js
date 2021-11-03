export const formatTimestamp = timestamp => {
    const timeStr = new Date(timestamp).toLocaleTimeString();
    const timeStrArr = timeStr.split(':');
    let formattedTime = '';
    if (timeStrArr.length && +timeStrArr[0] > 12) {
        formattedTime = `${timeStrArr[0] - 12}:${timeStrArr[1]}`
    } else {
        formattedTime = timeStr.substr(0,5)
    }

    formattedTime += +timeStrArr[0] >= 12 ? 'pm' : 'am';

    return formattedTime;
}

export const insertIntoMessages = ({ data, allChats = {}, type }) => {
    const { text, sender, receiver, timestamp } = data;
    const revisedChats = { ...allChats };
    
    const key = `${type === 'SENT' ? receiver : sender}`;

    const currentChat = revisedChats[key] || [];
    currentChat.push({
        text, sender, timestamp, type
    });

    revisedChats[key] = [...currentChat];

    return revisedChats;
};