import Cookies from 'js-cookie';

export interface UserData {
  userId: number;
  name: string;
  email: string;
  studentId: string;
  course: string;
}

export const checkAuth = (): UserData | null => {
  const sessionCookie = Cookies.get('session');
  
  if (!sessionCookie) {
    return null;
  }
  
  try {
    return JSON.parse(sessionCookie);
  } catch {
    Cookies.remove('session');
    return null;
  }
};

export const logout = () => {
  Cookies.remove('session');
  localStorage.removeItem('user');
};