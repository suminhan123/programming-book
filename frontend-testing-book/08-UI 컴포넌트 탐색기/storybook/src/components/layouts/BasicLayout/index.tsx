import { AlertDialogProvider } from "@/components/organisms/AlertDialog";
import { LoginUserInfoProvider } from "@/components/providers/LoginUserInfo";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ReactElement, ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";
import styles from "./styles.module.css";

/**
 * 서비스에서 필요한 provider => 스토리북 전용 provider 를 데커레이터로 만들기
 */
export const BasicLayoutProviders = ({ children }: { children: ReactNode }) => {
  return (
    <LoginUserInfoProvider>
      <ToastProvider>
        <AlertDialogProvider>{children}</AlertDialogProvider>
      </ToastProvider>
    </LoginUserInfoProvider>
  );
};

export const BasicLayout = (page: ReactElement) => {
  return (
    <BasicLayoutProviders>
      <div className={styles.root}>
        <Header />
        <main>{page}</main>
      </div>
      <Footer />
    </BasicLayoutProviders>
  );
};
