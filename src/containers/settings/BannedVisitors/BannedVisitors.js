import React, { useState } from "react";
import { BsFillPeopleFill } from "react-icons/bs";
import Button from "../../../components/controls/buttons/Button";
import { ComfirmationDialog } from "../../../components/controls/comfirmationDialog/ComfirmationDialog";
import { InnerHeader } from "../../../components/controls/innerHeader/InnerHeader";
import { banVisitor, removeBanVisitor } from "../../../store/actions/visitors";
import { connect } from "react-redux";
import AddToBannedModal from "../../../components/modals/addToBannedModal/addToBannedModal";
import './bannedvisitors.scss';

const BannedItem = ({bannedVisitorsListItem, removeBanForVisitor}) => {
    const [show, setshow] = useState(false);
    
    const onDeleteComifrmed = () => {
      removeBanForVisitor(bannedVisitorsListItem.ip);
      setshow(false);
    };
  
    const onDeleteDenied = () => {
      setshow(false);
    };
  
    return (
      <>
        <tr className="banned-item-container">
          <td className="banned-item-name">{bannedVisitorsListItem.ip}</td>
          <td className="banned-item-name">{bannedVisitorsListItem.countryfrom}</td>
          <td className="banned-item-description">{bannedVisitorsListItem.reason}</td>
          <td className="banned-item-name">{bannedVisitorsListItem.agent}</td>
          <td className="banned-item-name">{bannedVisitorsListItem.date}</td>           
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

const BannedVisitors = ({visitorBannedBy, bannedVisitorsList, addBannedVisitorToStore, removeBanForVisitor}) => {

  const [showBannedModal, setshowBannedModal] = useState(false);

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
              variant="primary"
              size="l"
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
                key={bannedVisitorsListItem.ip}
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
  let { bannedVisitorsList } = state.visitorsState;
  let visitorBannedBy = userInfo.name;

  return { visitorBannedBy, bannedVisitorsList };
};

const mapDispatchToProps = (dispatch) => ({
  addBannedVisitorToStore: (visitorobj) => {
    dispatch(banVisitor(visitorobj));
  },
  removeBanForVisitor: (visitorip) => {
    dispatch(removeBanVisitor(visitorip));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BannedVisitors);