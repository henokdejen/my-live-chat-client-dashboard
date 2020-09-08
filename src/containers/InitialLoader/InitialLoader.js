import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";

const InitialLoader = withRouter(({ loadInitialData, history }) => {
  useEffect(() => {
    loadInitialData(history);
    console.log("I am fine");
  }, []);
  return <div className="initialLoader">Loading....</div>;
});

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: (history) => {
    dispatch({ type: "LOAD_INITIAL_DATA_REQUESTED", history });
  },
});

export default connect(null, mapDispatchToProps)(InitialLoader);
