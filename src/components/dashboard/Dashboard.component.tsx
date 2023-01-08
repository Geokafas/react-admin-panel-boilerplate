import { Outlet } from "react-router-dom";
import SidebarWithHeader from "../../shared/sidebar/sidebar.component";

function Dashboard() {
  return (
    <>
      <SidebarWithHeader children={<Outlet />} />
    </>
  );
}
export default Dashboard;
