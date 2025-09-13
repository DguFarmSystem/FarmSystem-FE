import { create } from 'zustand';
import { persist, combine } from 'zustand/middleware';

type AuthStep = 'start' | 'input' | 'check-name' | 'error' | 'not-member' | 'complete';

interface AuthState {
  step: AuthStep;
  studentId: string;
  userName: string;
  errorMessage: string | null;
  errorTitle: string | null;
  accessToken?: string;
}

export const useAuthStore = create(
  persist(
    combine<AuthState, any>(
      {
        step: 'start',
        studentId: '',
        userName: '',
        errorMessage: null,
        errorTitle: null,
        accessToken: undefined,
      },
      set => ({
        setStep: (step: AuthStep) => set({ step }),
        setStudentId: (studentId: string) => set({ studentId }),
        setUserName: (userName: string) => set({ userName }),
        setErrorMessage: (msg: string | null) => set({ errorMessage: msg }),
        setErrorTitle: (title: string | null) => set({ errorTitle: title }),
        setToken: (token: string) => set({ accessToken: token }),
        reset: () =>
          set({
            step: 'start',
            studentId: '',
            userName: '',
            errorMessage: null,
            errorTitle: null,
            accessToken: undefined,
          }),
      }),
    ),
    {
      name: 'auth-storage',
      partialize: state => ({
        studentId: state.studentId,
        accessToken: state.accessToken,
      }),
    },
  ),
);
