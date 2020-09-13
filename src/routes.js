import React from "react";
import AgentManager from "./containers/AgentManager/AgentManager";
import MyProfile from "./containers/MyProfile/MyProfile";
import ChatShell from "./containers/shell/ChatShell";
import Settings from "./containers/Layouts/settings/Settings";
import VisitorShell from "./containers/visitor/VisitorShell";

export const rootRoutes = {
  base: "",
  routes: [
    {
      path: "conversations",
      name: "conversations Page",
      component: ChatShell,
    },
    {
      path: "visitors",
      name: "visitors Page",
      component: VisitorShell,
    },
    {
      path: "settings",
      name: "settings Page",
      component: Settings,
    },
  ],
};

export const settingRoutes = {
  base: "/settings",
  routes: [
    {
      path: "agents",
      name: "Agents Manager",
      component: AgentManager,
    },
    {
      path: "me",
      name: "My Profile",
      component: MyProfile,
    },
  ],
};
