import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import * as API from "../../../API/base";

import { PopupContainer } from "../../../components/controls/popupContainer/PopupContainer";

import "./reportBody.scss";
import { FormSubmitBar } from "../../../components/form-submit-bar/FormSubmitBar";
import { BsCalendar } from "react-icons/bs";

import { ReportGrapher } from "../report-grapher/ReportGrapher";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import Button from "../../../components/controls/buttons/Button";
import { parseReportDataToGraph } from "../../../Utils/chart-helper";
import { tr } from "date-fns/locale";

const endDateInit = new Date();
const startDateInit = addDays(endDateInit, -7);

const DatePickerPopup = ({ initRange, onNewSelection, handleClose }) => {
  const [datePickerState, setdatePickerState] = useState([
    {
      ...initRange,
      key: "selection",
    },
  ]);

  return (
    <PopupContainer className="report-date-picker" handleClose={handleClose}>
      <DateRangePicker
        onChange={(item) => setdatePickerState([item.selection])}
        showSelectionPreview={false}
        moveRangeOnFirstSelection={false}
        ranges={datePickerState}
        className="nukera"
      />

      <form
        className="date-picker-controller"
        onSubmit={(e) => {
          e.preventDefault();
          console.log("huelte", onNewSelection);
          onNewSelection(datePickerState[0]);
        }}
      >
        <FormSubmitBar
          buttonSize="sm"
          positiveButtonName="Done"
          negativeButtonName="Cancel"
          onCancel={(e) => {
            e.preventDefault();
            handleClose();
          }}
        />
      </form>
    </PopupContainer>
  );
};

const formatDateForFilter = (date) => {
  const fillZero = (num) => (num < 10 ? `0${num}` : num);

  let formatedDate = `${date.getFullYear()}-${fillZero(
    date.getMonth() + 1
  )}-${fillZero(date.getDate())}`;
  return formatedDate;
};

export const ReportBody = ({
  match: {
    params: { reportItem },
  },
}) => {
  const [dateRanges, setdateRanges] = useState({
    startDate: startDateInit,
    endDate: endDateInit,
  });

  const [reportData, setreportData] = useState(null);
  const [reportsLoaded, setreportsLoaded] = useState(false);
  const [showDatePicker, setshowDatePicker] = useState(false);

  const pageTitle =
    reportItem == "liveChat"
      ? "LiveChat Report"
      : reportItem == "tickets"
      ? "Tickets Report"
      : "Visitors Report";

  const filterBy =
    reportItem == "liveChat"
      ? "conversations"
      : reportItem == "tickets"
      ? "tickets"
      : "visitors";

  const loadReports = () => {
    let { startDate, endDate } = dateRanges;
    startDate = formatDateForFilter(startDate);
    endDate = formatDateForFilter(endDate);

    API.loadReports(startDate, endDate, filterBy)
      .then((response) => {
        if (response.success) {
          // userInfoUpdated(values.name, values.timeZone);
          setreportsLoaded(true);
          setreportData(parseReportDataToGraph(response.data));
        } else {
          // setsubmitError(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
        setreportsLoaded(true);
      });
  };

  useEffect(() => {
    // proccessing dates will happen here
    setreportsLoaded(false);
    setTimeout(() => {
      loadReports();
    }, 1000);

    return () => {};
  }, [reportItem, dateRanges]);

  const onDateRangeChanged = (newSelection) => {
    setdateRanges(newSelection);
    setshowDatePicker(false);
  };

  return (
    <div className="report-wrapper">
      <InnerHeader>
        <div className="title">{pageTitle}</div>
      </InnerHeader>

      <div className="reports-header">
        <div className="reports-left">
          Filters
          <div
            className="selected-date-filter"
            onClick={(e) => setshowDatePicker(!showDatePicker)}
          >
            <BsCalendar />
            {dateRanges.startDate.toDateString()} -{" "}
            {dateRanges.endDate.toDateString()}
          </div>
          <div className="date-picker-wrapper">
            {showDatePicker && (
              <DatePickerPopup
                initRange={dateRanges}
                onNewSelection={onDateRangeChanged}
                handleClose={(e) => setshowDatePicker(false)}
              />
            )}
          </div>
        </div>

        <div className="reports-right">
          <Button variant="primary" size="sm">
            Export CSV
          </Button>
        </div>
      </div>

      <div className="reports-body">
        {reportsLoaded ? (
          <ReportGrapher data={reportData} yaxisKeys={[filterBy]} />
        ) : (
          <div> Loading </div>
        )}
      </div>
    </div>
  );
};
