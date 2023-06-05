import { ReactNode } from "react";
import SideBar from "./SideBar/SideBar";
import Header from "./Header/Header";

import styles from './ClientInsuranceLayout.module.scss'

type MainLayoutProps = {
  children: ReactNode;
};
const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.root}>
      <Header/>
      {children}
      <SideBar />
    </div>
  );
};
export default MainLayout;
