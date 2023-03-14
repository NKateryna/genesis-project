export const authService = {
  anonymousLogin: async () => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_API_URL}/${process.env.REACT_APP_API_VERSION}/auth/anonymous?platform=subscriptions`
    );
    const data = await response.json();

    localStorage.setItem("authToken", data.token);
    return data.token;
  },
};
