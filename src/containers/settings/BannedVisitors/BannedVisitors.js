import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Button from "../../../components/controls/buttons/Button";
import { ComfirmationDialog } from "../../../components/controls/comfirmationDialog/ComfirmationDialog";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { banVisitor, removeBanVisitor } from "../../../store/actions/visitors";
import { connect } from "react-redux";
import * as API from "../../../API/base";
import AddToBannedModal from "../../../components/modals/addToBannedModal/addToBannedModal";
import { getFormatedFullDate } from "../../../Utils/index";
import './bannedvisitors.scss';

const BannedItem = ({bannedVisitorsListItem, removeBanForVisitor}) => {
    const [show, setshow] = useState(false);
    
    const onDeleteComifrmed = () => {
      setTimeout(() => {
        API.liftBanForVisitor([bannedVisitorsListItem._id])
        .then((response) => {
          const { data } = response;
          if (data.success) {
            removeBanForVisitor(bannedVisitorsListItem._id);      
          }
          })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setshow(false);
        });
    },600);
    };
  
    const onDeleteDenied = () => {
      setshow(false);
    };
  
    return (
      <>
        <tr className="banned-item-container">
          <td className="banned-item-name">{bannedVisitorsListItem.IPaddress}</td>
          <td className="banned-item-name">{bannedVisitorsListItem.country}</td>
          <td className="banned-item-description">{bannedVisitorsListItem.reason}</td>
          <td className="banned-item-name">{bannedVisitorsListItem.bannedBy}</td>
          <td className="banned-item-name">{getFormatedFullDate(new Date(parseInt(bannedVisitorsListItem.date)))}</td>           
           <td>
              <Button size="sm" variant="primary" onClick={() => setshow(true)}>
                Remove
              </Button>
  
              <ComfirmationDialog
                show={show}
                message="Are you sure you want to remove this ip address?"
                cancelBtnTitle="Cancel"
                comfirmBtnTitle="Remove"
                onComfirmation={onDeleteComifrmed}
                onDeny={onDeleteDenied}
              />
            </td>
        </tr>
      </>
    );
  };

const BannedVisitors = ({visitorBannedBy, bannedVisitorsList, addBannedVisitorToStore, removeBanForVisitor, bannedVisitorsLoaded}) => {

  const [showBannedModal, setshowBannedModal] = useState(false);
  const [loadingbannedvisitors, setLoadingbannedvisitors] = useState(false);

  React.useEffect(()=>{
    loadBannedVisitors();
  },[]);
  
  const loadBannedVisitors = () => {
    if(bannedVisitorsLoaded) return;
    setLoadingbannedvisitors(true);
    setTimeout(() => {
        API.getBannedIPAddress()
        .then((response) => {
          if (response.success) {
            response.data.forEach((d)=>{
              addBannedVisitorToStore(d);
            });
          }
          })
        .catch((error) => {
          console.log(error);
        })
        .then(() => {
          setLoadingbannedvisitors(false);
        });
    },600);
  }

  return (
    <div className="banned-visitors inner-body-section">
       {showBannedModal && (
        <AddToBannedModal
          visitorBannedBy={visitorBannedBy}
          addBannedVisitorToStore={addBannedVisitorToStore}
          handleClose={() => setshowBannedModal(false)}
        />
      )}
      <InnerHeader>
        <div className="title">
          <BsFillPeopleFill />
          BAN LIST
        </div>
        <div className="action-menu">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setshowBannedModal(true)}>
              BanIP
            </Button>
        </div>
      </InnerHeader>
      <table>
        <tbody>
        <tr className="banned-item-container-head">
          <td className="banned-item-name-head">Visitor/IP Address</td>
          <td className="banned-item-name-head">Country</td>
          <td className="banned-item-description-head">Ban Reason</td>
          <td className="banned-item-name-head">BannedBy</td>
          <td className="banned-item-name-head">Date</td>   
          </tr>
          {bannedVisitorsList.map((bannedVisitorsListItem)=>{
          return <BannedItem 
                bannedVisitorsListItem={bannedVisitorsListItem}
                key={bannedVisitorsListItem._id}
                removeBanForVisitor={removeBanForVisitor}
            />
          })}
        </tbody>
      </table>
    </div>
  );
}

const mapStateToProps = (state) => {
  let { userInfo } = state.basicState;
  let { bannedVisitorsList, bannedVisitorsLoaded } = state.visitorsState;
  let visitorBannedBy = userInfo.name;

  return { visitorBannedBy, bannedVisitorsList, bannedVisitorsLoaded };
};

const mapDispatchToProps = (dispatch) => ({
  addBannedVisitorToStore: (visitorobj) => {
    dispatch(banVisitor(visitorobj));
  },
  removeBanForVisitor: (visitorbanid) => {
    dispatch(removeBanVisitor(visitorbanid));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BannedVisitors);