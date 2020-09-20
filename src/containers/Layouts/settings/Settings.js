import React from "react";
import { InnerNav } from "../../../components/controls/innerNav/InnerNav";
import { InnerNavHeader } from "../../../components/controls/innerHeader/InnerNavHeader";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { OuterSectionWrapper } from "../../../components/section-wrapper/OuterSectionWrapper";

import "./settings.scss";
import { InnerNavBody } from "../../../components/innerNavBody/InnerNavBody";
import { NavLink, useRouteMatch, Switch, Route } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
// import { Outlet } from "react-router-dom";
import AgentManager from "../../AgentManager/AgentManager";
import MyProfile from "../../MyProfile/MyProfile";

import { settingRoutes } from "../../../routes";

const settings = [
  {
    section: "General",
    menus: [
      {
        title: "Agents",
        path: "agents",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "My Profile",
        path: "me",
        icon: <BsFillPeopleFill />,
      },
    ],
  },

  {
    section: "Channels",
    menus: [
      {
        title: "Chat Widget",
        path: "chatWidget",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Chat Page",
        path: "chatPage",
        icon: <BsFillPeopleFill />,
      },
    ],
  },
];

const SettingsSectionTitle = ({ children }) => {
  return <div className="settings-section-title">{children}</div>;
};

const SettingMenuItem = ({ to, children }) => (
  <NavLink to={to} className="setting-menu-item" activeClassName="active">
    {children}
  </NavLink>
);

const Settings = () => {
  let { path } = useRouteMatch();

  return (
    <OuterSectionWrapper>
      <InnerNav className="visitors-nav">
        <InnerNavHeader>Settings</InnerNavHeader>
        <InnerNavBody>
          {settings.map((section, index) => {
            let menus = section.menus.map((menu, index) => (
              <SettingMenuItem
                key={section.section + index}
                to={`${path}/${menu.path}`}
              >
                {menu.icon} {menu.title}{" "}
              </SettingMenuItem>
            ));

            return (
              <>
                <SettingsSectionTitle>{section.section}</SettingsSectionTitle>
                {menus}
              </>
            );
          })}
        </InnerNavBody>
      </InnerNav>

      <div className="settings-main-body">
        <Switch>
          {settingRoutes &&
            settingRoutes.routes.map((route, index) => (
              <Route
                key={index}
                path={`${settingRoutes.base}/${route.path}`}
                name="agents management"
                render={(props) => <route.component {...props} />}
              />
            ))}
        </Switch>
      </div>
    </OuterSectionWrapper>
  );
};

export default Settings;
