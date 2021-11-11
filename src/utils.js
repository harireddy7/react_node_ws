export const formatTimestamp = (timestamp) => {
	const timeStr = new Date(timestamp).toLocaleTimeString();
	const timeStrArr = timeStr.split(':');
	let formattedTime = '';
	if (timeStrArr.length && +timeStrArr[0] > 12) {
		formattedTime = `${timeStrArr[0] - 12}:${timeStrArr[1]}`;
	} else {
		formattedTime = timeStr.substr(0, 5);
	}

	formattedTime += +timeStrArr[0] >= 12 ? 'pm' : 'am';

	return formattedTime;
};

export const insertIntoMessages = ({ data, allChats = {}, type }) => {
	const { text, sender, receiver, timestamp } = data;
	const revisedChats = { ...allChats };

	const key = `${type === 'SENT' ? receiver : sender}`;

	const currentChat = revisedChats[key] || [];
	currentChat.push({
		text,
		sender,
		timestamp,
		type,
	});

	revisedChats[key] = [...currentChat];

	const newChats = {
		[key]: revisedChats[key],
	};

	Object.keys(revisedChats)
		.filter((id) => id !== key)
		.forEach((chat) => {
			newChats[chat] = revisedChats[chat];
		});

	return newChats;
};

export const getFirstName = (name) => {
	return name.split(' ')[0];
};

export const isProfilePicPresent = image => image && /(.jpg|.jpeg|.png)$/.test(image);

export const checkIfMobile = (screens) => {
	const breakpoints = Object.keys(screens).filter((scr) => screens[scr]);
	const activeBreakpoint = breakpoints[breakpoints.length - 1];
	return ['sm', 'xs'].includes(activeBreakpoint);
};

export const getActiveBreakpoint = (screens) => {
    const breakpoints = Object.entries(screens).filter((screen) => !!screen[1]).map(bp => bp[0]);
    return breakpoints[breakpoints.length - 1];
};
