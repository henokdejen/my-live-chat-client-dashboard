import React, { useState } from "react";
import { connect } from "react-redux";
import { NavLink, Switch, Route } from "react-router-dom";
import {
  Redirect,
  useRouteMatch,
} from "react-router-dom/cjs/react-router-dom.min";
import { InnerNavHeader } from "../../components/controls/innerHeader/InnerNavHeader";
import { InnerNav } from "../../components/controls/innerNav/InnerNav";
import { InnerNavBody } from "../../components/innerNavBody/InnerNavBody";
import { OuterSectionWrapper } from "../../components/section-wrapper/OuterSectionWrapper";
import { ticketRoutes } from "../../routes";
import "./ticket.scss";

const InnerNavItem = (props) => {
  return (
    <NavLink to={props.to} className="inner-nav-item" activeClassName="active">
      {props.children}
    </NavLink>
  );
};

const Tickets = ({}) => {
  let { path } = useRouteMatch();

  return (
    <OuterSectionWrapper cn="tickets-main-wrapper">
      <InnerNav className="visitors-nav">
        <InnerNavHeader>Tickets</InnerNavHeader>
        <InnerNavBody>
          <input className="ticket-search" type="text" placeholder="Search" />

          <div className="tickets-main-section">
            <InnerNavItem to={`${path}/unAssigned`}>
              Un Assigned Tickets
            </InnerNavItem>
            <InnerNavItem to={`${path}/mine`}>My Tickets</InnerNavItem>
          </div>
          <div className="tickets-main-section">
            <InnerNavItem to={`${path}/open`}>Open</InnerNavItem>
            <InnerNavItem to={`${path}/pending`}>Pending</InnerNavItem>
            <InnerNavItem to={`${path}/closed`}>Closed</InnerNavItem>
          </div>
          <div className="tickets-main-section">
            <InnerNavItem to={`${path}/all`}>All Tickets</InnerNavItem>
          </div>
        </InnerNavBody>
      </InnerNav>

      <div className="tickets-main">
        <Switch>
          {ticketRoutes &&
            ticketRoutes.routes.map((route, index) => {
              let path = `${ticketRoutes.base}/${route.path}`;
              return (
                <Route
                  key={index}
                  path={path}
                  name={route.name}
                  render={(props) => <route.component {...props} />}
                />
              );
            })}
          <Redirect to="/tickets" />
        </Switch>
      </div>
    </OuterSectionWrapper>
  );
};

const mapStateToProps = (state) => {
  let { tickets } = state.ticketState;
  return { tickets };
};

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tickets);
