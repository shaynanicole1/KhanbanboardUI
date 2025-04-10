import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin): Promise<string | null> => {
  try {
    const response = await fetch('/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      throw new Error('Login failed: invalid credentials');
    }

    const data = await response.json();
    const token = data.token;

    if (token) {
      localStorage.setItem('token', token); // 🔐 Save the token
      return token;
    }

    return null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

export { login };

