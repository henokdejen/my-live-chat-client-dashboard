import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Greetting } from "../../components/home/greeting/Greetting";
import { RealTimeReport } from "../../components/home/real-time-report/RealTimeReport";
import { TodaysReport } from "../../components/home/todays-report/TodaysReport";
import { VisitorSatisfaction } from "../../components/home/user-satisfaction/VisitorSatisfaction";
import { OuterSectionWrapper } from "../../components/section-wrapper/OuterSectionWrapper";
import { ReportGrapher } from "../../containers/report/report-grapher/ReportGrapher";
import "./home.scss";
import * as API from "../../API/base";
import { parseReportDataToGraph } from "../../Utils/chart-helper";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getTotalVotes = (reports) => {
  let upVotes = 0,
    downVotes = 0;

  for (let report of reports) {
    upVotes += report.upVotes;
    downVotes += report.downVotes;
  }

  return { upVotes, downVotes };
};

const Home = ({ userInfo, realTimeReports }) => {
  const [last7dayReports, setlast7reports] = useState([]);

  const todaysReport = last7dayReports.length
    ? last7dayReports[last7dayReports.length - 1]
    : null;

  let upVotes = console.log("baba", last7dayReports);

  useEffect(() => {
    API.loadReports("", "", "conversations|visitors|tickets")
      .then((data) => {
        if (data.success) {
          console.log("Engdih", data.data);
          setlast7reports(parseReportDataToGraph(data.data));
        } else {
        }
      })
      .catch((e) => {});
  }, []);

  return (
    <OuterSectionWrapper cn="dashboard-home">
      <div className="home-main-inner-wrapper">
        <Greetting userInfo={userInfo} />
        <div className="report-row row short-reports">
          <RealTimeReport realTimeReports={realTimeReports} />

          <TodaysReport todaysReport={todaysReport} />
        </div>

        <div className="report-row row graph-row">
          <div className="visitors-satisfaction-wrapper  report-card">
            <VisitorSatisfaction />
          </div>

          <div className="stat-graph  report-card">
            <div className="report-card-title">Last 7 days report</div>
            <div className="stat-graph-inner">
              <ReportGrapher
                data={last7dayReports}
                yaxisKeys={["visitors", "conversations", "tickets"]}
              />
            </div>
          </div>
        </div>
      </div>
    </OuterSectionWrapper>
  );
};

const mapStateToProps = (state) => {
  let {
    userInfo,
    projectInfo: { agents, onlineAgents },
  } = state.basicState;

  console.log("masher", state.basicState);

  let realTimeReports = [
    {
      label: "Online Users new yhe",
      value: state.visitorsState.onlineVisitors.length,
      link: "/visitors",
    },
    {
      label: "Un Assinged Tickets",
      value: state.basicState.projectInfo.openTicketsCount,
      link: "/tickets/unAssigned",
    },
    {
      label: "Online Agents",
      value: agents.filter((agent) => agent.isOnline).length,
      outOf: agents.length,
      link: "/settings/agents",
    },
  ];

  return { userInfo, realTimeReports };
};

const mapDispatchToProps = (dispatch) => ({
  // removeAgentFromStore: (agentID) => {
  //   dispatch(agentRemoved(agentID));
  // },
  // addAgentToStore: (agent) => {
  //   dispatch(newAgentAdded(agent));
  // },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
