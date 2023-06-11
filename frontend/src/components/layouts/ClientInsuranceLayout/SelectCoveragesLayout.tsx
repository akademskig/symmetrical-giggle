import { ReactNode } from 'react';
import SideBar from './SideBar/SideBar';
import Header from './Header/Header';

import styles from './SelectCoveragesLayout.module.scss';

type MainLayoutProps = {
  children: ReactNode;
};
const SelectCoveragesLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className={styles.root}>
      <Header />
      {children}
      <SideBar />
    </div>
  );
};
export default SelectCoveragesLayout;
