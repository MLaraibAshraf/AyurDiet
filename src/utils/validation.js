export const validateEmail = (email) => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
};

export const validatePassword = (password) => {
	return password.length >= 6;
};

export const validateName = (name) => {
	return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
};

export const validatePhone = (phone) => {
	const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
	return phoneRegex.test(phone);
};
