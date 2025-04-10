
import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  // Get user info from the token
  getProfile() {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  // Check if token exists and is valid
  loggedIn(): boolean {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if token is expired
  isTokenExpired(token: string): boolean {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true;
      return decoded.exp * 1000 < Date.now(); // exp is in seconds
    } catch (err) {
      return true;
    }
  }

  // Get token from localStorage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Store token and redirect to Kanban board
  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/kanban'); // redirect to board
  }

  // Remove token and redirect to login
  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService();
