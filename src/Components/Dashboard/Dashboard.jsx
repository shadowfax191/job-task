import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Dashboard = () => {
    return (
        <div className="max-w-screen-2xl mx-auto lg:flex gap-5">
          <div className="min-w-[20rem] lg:fixed">
          <Sidebar ></Sidebar>
          </div>
          <div className="lg:pl-96 md:pt-16 pt-5">
          <Outlet></Outlet>
          </div>
        </div>
    );
};

export default Dashboard;