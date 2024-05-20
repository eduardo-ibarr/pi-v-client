import React from "react";
import { Drawer, IconButton } from "@material-tailwind/react";

import { RxHamburgerMenu } from "react-icons/rx";
import DefaultSidebar from "../Sidebar";

export function DrawerDefault() {
  const [open, setOpen] = React.useState(false);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  return (
    <>
      <IconButton onClick={openDrawer} variant="text" color="white">
        <RxHamburgerMenu size={30} />
      </IconButton>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <DefaultSidebar />
      </Drawer>
    </>
  );
}
