import { User, AuthResponse, AuthStatus } from "../popup/types/userType";  
import { BackgroundMessage } from "./backgroundRequest";
import { 
  getCurrentUser, 
  setCurrentUser, 
  setIsAuthenticated 
} from "./authState";
import { logoutFunction } from "./authState";
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
const backendUrl = process.env.BACKEND_URL || 'http://localhost:4567';



  // Handle logout
  async function handleLogout(): Promise<AuthResponse> {
    try {
      // Clear backend session
      logoutFunction();
      const backendUrl = process.env.BACKEND_URL || 'http://localhost:4567';
      const cookie = await new Promise<chrome.cookies.Cookie | null>((resolve) => {
        chrome.cookies.get({
          url: backendUrl,
          name: 'connect.sid',
        }, (cookie) => {
          resolve(cookie || null);
        });
      });
      
      if (cookie) {
        await fetch(`${backendUrl}/auth/logout`, {
          headers: {
            'Cookie': `connect.sid=${cookie.value}`,
          },
        });
      }
      
      // Remove session cookie from goqualify.co
      await new Promise<void>((resolve) => {
        chrome.cookies.remove({
          url: backendUrl,
          name: 'connect.sid',
        }, () => {
          // console.log('Session cookie removed from goqualify.co');
          resolve();
        });
      });
      
      setCurrentUser(null);
      setIsAuthenticated(false);
      // console.log('Logout successful');
      // return { success: true };
    } catch (error) {
      // console.error('Logout error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  // Function to check authentication status
async function checkAuthStatus(): Promise<void> {
    // console.log('Checking auth status');
    try {
      // Get session cookie from goqualify.co domain
      const cookie = await new Promise<chrome.cookies.Cookie | null>((resolve) => {
        chrome.cookies.get({
          url: backendUrl,
          name: 'connect.sid',
        }, (cookie) => {
          resolve(cookie || null);
        });
      });
      
      // console.log('Session cookie from goqualify.co:', cookie);
      
      if (!cookie) {
        setCurrentUser(null);
        setIsAuthenticated(false);
        // console.log('No session cookie found on goqualify.co');
        return;
      }
  
      
      
      chrome.cookies.set({
        url: backendUrl,
        name: 'connect.sid',
        value: cookie.value,
      });
      
      // Use the cookie to authenticate with backend
      const response = await fetch(`${backendUrl}/auth/authenticate`, {
        credentials: 'include',
      });
      if (response.ok) {
        const data = await response.json();
        // console.log('Auth data:', data);
        if (data.user) {
          setCurrentUser(data.user as User);
          setIsAuthenticated(true);
          // console.log('User authenticated:', currentUser);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
          // console.log('No user in response');
        }
      } else {
        setCurrentUser(null);
        setIsAuthenticated(false);
        // console.log('Auth request failed:', response.status);
      }
    } catch (error) {
      // console.error('Auth check failed:', error);
      setCurrentUser(null);
      setIsAuthenticated(false);
    }
  }

  export {  handleLogout, checkAuthStatus };