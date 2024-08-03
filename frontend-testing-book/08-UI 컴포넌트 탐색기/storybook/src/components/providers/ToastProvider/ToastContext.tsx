import { createContext } from "react";

export type ToastStyle = "succeed" | "failed" | "busy";

export type ToastState = {
  isShown: boolean;
  message: string;
  style: ToastStyle;
};

// Toast 컴포넌트 렌더링을 결정하는 초기 상태
export const initialState: ToastState = {
  isShown: false,
  message: "",
  style: "succeed",
};

// Toast 상태를 소유할 ToastStateContext
export const ToastStateContext = createContext(initialState);

export type ToastAction = {
  showToast: (state?: Partial<Omit<ToastState, "isShown">>) => void;
  hideToast: () => void;
};

export const initialAction: ToastAction = {
  showToast: () => {},
  hideToast: () => {},
};

// Toast 상태 갱신 함수를 소유할 ToastActionContext
export const ToastActionContext = createContext(initialAction);
