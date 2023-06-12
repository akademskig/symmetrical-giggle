import { Route, Routes } from 'react-router-dom';
import SelectCoveragesPage from '../pages/SelectCoveragesPage/SelectCoveragesPage';
import ViewCustomerDataPage from '../pages/ViewCustomerDataPage/ViewCustomerDataPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<SelectCoveragesPage />} />
      <Route path="/view-customer-data" element={<ViewCustomerDataPage />} />
    </Routes>
  );
};
export default AppRoutes;
