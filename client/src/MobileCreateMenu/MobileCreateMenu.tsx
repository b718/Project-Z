import React, { useContext } from "react";
import { MobileOpenContext, SideBarContext } from "../Map/MapLeaflet";
import { Button, Flex, Text } from "@mantine/core";
import "./MobileCreateMenu.css";
const MobileCreateMenu = () => {
  const mobileOpen = useContext(MobileOpenContext);
  const sideBarView = useContext(SideBarContext);

  return (
    <div>
      {mobileOpen.mobileOpen ? (
        <div className="mobile-create-menu">
          <Flex justify={"center"} align={"center"} gap={"md"}>
            {" "}
            <Button
              onClick={() => {
                sideBarView.setView(!sideBarView.view);
              }}
            ></Button>
            <Text className="mobile-create-menu-events-button-text" fz={"xs"}>
              Add: {sideBarView.view ? "On" : "Off"}
            </Text>
          </Flex>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default MobileCreateMenu;
