import React from "react";

import ChatShell from "./containers/chat/chat-shell/ChatShell";
import TicketManager from "./containers/ticket/TicketsManager/TicketManager";
import AgentManager from "./containers/settings/AgentManager/AgentManager";
import DepartmentManager from "./containers/settings/DepartmentManager/DepartmentManager";
import BannedVisitors from "./containers/settings/BannedVisitors/BannedVisitors";
import ChatWidgetSettings from "./containers/settings/chatWidgetSettings/ChatWidgetSettings";
import MyProfile from "./containers/settings/MyProfile/MyProfile";
import TicketBody from "./containers/ticket/TicketBody/TicketBody";
import VisitorShell from "./containers/visitor/visitor-shell/VisitorShell";
import Settings from "./Layouts/settings/Settings";
import Tickets from "./Layouts/tickets/Tickets";

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
      path: "tickets",
      name: "Tickets Page",
      component: Tickets,
    },
    {
      path: "settings",
      name: "settings Page",
      component: Settings,
    },
  ],
};

export const ticketRoutes = {
  base: "/tickets",
  routes: [
    {
      path: ":filter/:id",
      name: "Ticket Manager",
      component: TicketBody,
    },
    {
      path: ":filter?",
      name: "Tickets List",
      component: TicketManager,
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
    {
      path: "departments",
      name: "Departments",
      component: DepartmentManager,
    },
    {
      path: "bannedvisitors",
      name: "Ban list",
      component: BannedVisitors,
    },
    {
      path: "chatWidget",
      name: "Chat Widget",
      component: ChatWidgetSettings,
    },
  ],
};
