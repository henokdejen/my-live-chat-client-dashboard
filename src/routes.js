import React from "react";
import AgentManager from "./containers/AgentManager/AgentManager";
import MyProfile from "./containers/MyProfile/MyProfile";
import ChatShell from "./containers/shell/ChatShell";
import Settings from "./containers/Layouts/settings/Settings";
import VisitorShell from "./containers/visitor/VisitorShell";
import Tickets from "./containers/Layouts/tickets/Tickets";
import { ChatWidgetSettings } from "./containers/chatWidgetSettings/ChatWidgetSettings";
import TicketManager from "./containers/TicketsManager/TicketManager";
import TicketBody from "./containers/TicketBody/TicketBody";

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
      path: "chatWidget",
      name: "Chat Widget",
      component: ChatWidgetSettings,
    },
  ],
};
