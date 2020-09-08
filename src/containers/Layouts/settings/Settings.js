import React from "react";
import { InnerNav } from "../../../components/controls/innerNav/InnerNav";
import { InnerNavHeader } from "../../../components/controls/innerHeader/InnerNavHeader";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { OuterSectionWrapper } from "../../../components/section-wrapper/OuterSectionWrapper";

import "./settings.scss";
import { InnerNavBody } from "../../../components/innerNavBody/InnerNavBody";
import { NavLink, useRouteMatch } from "react-router-dom";
import { BsFillPeopleFill } from "react-icons/bs";
// import { Outlet } from "react-router-dom";
import AgentManager from "../../AgentManager/AgentManager";

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
        title: "Lelafasd",
        path: "lelafadf",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Agents asdfa",
        path: "agentsfasdf",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Lela",
        path: "lela",
        icon: <BsFillPeopleFill />,
      },
    ],
  },

  {
    section: "General",
    menus: [
      {
        title: "Agents",
        path: "agentss",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Lela asfdasdf",
        path: "lelas",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Agents asfas ",
        path: "agentssssss",
        icon: <BsFillPeopleFill />,
      },
      {
        title: "Lelass",
        path: "lelaaf",
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
          {settings.map((section) => {
            let menus = section.menus.map((menu) => (
              <SettingMenuItem to={`${path}/${menu.path}`}>
                {" "}
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
        {/* <Outlet /> */}
        <AgentManager />
      </div>
    </OuterSectionWrapper>
  );
};

export default Settings;
