import React, { useState } from "react";
import {
  NavLink,
  Route,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { InnerHeader } from "../../components/controls/innerHeader/InnerHeader";
import { InnerNavHeader } from "../../components/controls/innerHeader/InnerNavHeader";
import { InnerNav } from "../../components/controls/innerNav/InnerNav";
import { InnerNavBody } from "../../components/innerNavBody/InnerNavBody";
import { OuterSectionWrapper } from "../../components/section-wrapper/OuterSectionWrapper";

import "./reports.scss";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { ReportBody } from "../../containers/report/report-body/ReportBody";
import { reportRoutes } from "../../routes";
import { Switch } from "react-router-dom";

const InnerNavItem = (props) => {
  return (
    <NavLink to={props.to} className="inner-nav-item" activeClassName="active">
      {props.children}
    </NavLink>
  );
};

const Reports = () => {
  const { path } = useRouteMatch();

  return (
    <OuterSectionWrapper cn="report-outer-wrapper">
      <InnerNav className="visitors-nav">
        <InnerNavHeader>Reports</InnerNavHeader>
        <InnerNavBody>
          <InnerNavItem to={`${path}/liveChat`}>Live Chat</InnerNavItem>
          <InnerNavItem to={`${path}/tickets`}>Tickets</InnerNavItem>
          <InnerNavItem to={`${path}/visitors`}>Visitors</InnerNavItem>
        </InnerNavBody>
      </InnerNav>

      <div className="reports-main inner-body-section">
        {/* <div className="reports-main-inner"> */}
        <Switch>
          {reportRoutes &&
            reportRoutes.routes.map((route, index) => (
              <Route
                key={index}
                path={`${reportRoutes.base}/${route.path}`}
                render={(props) => <route.component {...props} />}
              />
            ))}
        </Switch>
        {/* <ReportBody /> */}
        {/* </div> */}
      </div>
    </OuterSectionWrapper>
  );
};

export default Reports;
