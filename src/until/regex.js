export const regexAccount = (account) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    return regex.test(account);
};

export const regexEmail = (email) => {
    const regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
};