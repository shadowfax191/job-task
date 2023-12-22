
import {
    PresentationChartBarIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    XMarkIcon,
    Bars4Icon,
    HomeIcon,
} from "@heroicons/react/24/solid";
import { Card, Chip, Collapse, IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Typography } from "@material-tailwind/react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";



const Sidebar = () => {
    const [openNav, setOpenNav] = useState(false);
    const {LogOut}=useContext(AuthContext)
    const handleLogout=()=>{
        LogOut()
    }

    return (
        <div>
            <Card className="h-[calc(100vh)] w-full max-w-[20rem] bg-error  hidden lg:block">
                <div className="mb-5 py-5 ">
                    <Typography className="text-3xl font-bold text-center" >
                        Dashboard
                    </Typography>
                </div>
                <List className="text-black font-bold text-xl  px-7 space-y-3">
                    <NavLink to='/dashboard/task'>

                        <ListItem className="p-2">
                            <ListItemPrefix className="pr-3">
                                <PresentationChartBarIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Task-list
                        </ListItem>
                    </NavLink>

                    <NavLink to='/dashboard/profile'>
                        <ListItem className="p-2">
                            <ListItemPrefix className="pr-3">
                                <UserCircleIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Profile
                        </ListItem>
                    </NavLink>

                    <NavLink to='/'>
                        <ListItem className="p-2">
                            <ListItemPrefix className="pr-3">
                                <HomeIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Home
                        </ListItem>
                    </NavLink>



                    <button onClick={handleLogout}>
                        <ListItem className="p-2">
                            <ListItemPrefix className="pr-3">
                                <PowerIcon className="h-5 w-5" />
                            </ListItemPrefix>
                            Log Out
                        </ListItem>
                    </button>
                </List>
            </Card>

            <div className={` p-5 ${openNav && 'bg-error w-full h-full'}`}>
                <IconButton
                    variant="text"
                    color="blue-gray"
                    className={`lg:hidden `}
                    onClick={() => setOpenNav(!openNav)}
                >

                    {openNav ? (
                        <div className="w-full bg-error"> <XMarkIcon className="h-6 w-6 " strokeWidth={2} /></div>
                    ) : (
                        <div className="">
                            <Bars4Icon className="h-6 w-6 " strokeWidth={2} />
                        </div>
                    )}

                </IconButton>
            </div>

            {
                openNav &&
                <Collapse open={openNav}>
                    <Card className="lg:hidden w-full bg-error py-6">
                        <div className="mb-5 py-5 ">
                            <Typography className="text-3xl font-bold text-center" >
                                Dashboard
                            </Typography>
                        </div>
                        <List className="text-black font-bold text-xl  px-7 space-y-5">
                            <ListItem className="text-center">
                                <ListItemPrefix className="pr-3">
                                    <PresentationChartBarIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Dashboard
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="pr-3">
                                    <ShoppingBagIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                E-Commerce
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="pr-3">
                                    <InboxIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Inbox
                                <ListItemSuffix className="pr-3">
                                    <Chip value="14" size="sm" variant="ghost" color="blue-gray" className="rounded-full" />
                                </ListItemSuffix>
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="pr-3">
                                    <UserCircleIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Profile
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="pr-3">
                                    <Cog6ToothIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Settings
                            </ListItem>
                            <ListItem>
                                <ListItemPrefix className="pr-3">
                                    <PowerIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                Log Out
                            </ListItem>
                        </List>
                    </Card>

                </Collapse>
            }
        </div>

    );
};

export default Sidebar;