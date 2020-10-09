import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import Button from "../../controls/buttons/Button";
import InputWithLabel from "../../controls/inputWithLabel/InputWithLabel";
import Modal from "../../controls/modal/Modal"; 
import {getFormatedFullDate, validateIPAddress} from "../../../Utils/index";
import ClipLoader from "react-spinners/ClipLoader";
import * as API from "../../../API/project";
import { banIPAddress } from "../../../API/base";
import "./addToBannedModal.scss";

const AddAgentSchema = () => {

  return Yup.object().shape({
    ipaddress: Yup.string()
      .required("* Required")
      .matches(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,"please enter valid ip address"),

    description: Yup.string()
      .min(3, "Too Short!")
      .max(120, "Too Long!")
      .required("* Required"), 
  });
};


const AddToBannedModal = ({handleClose, addBannedVisitorToStore, visitorBannedBy}) => {
  
  const [IPCountry, setIPCountry] = useState('');
  const [checkingIP, setCheckingIP] = useState(false);
  const today = getFormatedFullDate(new Date);

  const checkIPCountry = (ipaddr) => {
    if(validateIPAddress(ipaddr)){
      setCheckingIP(true);
      setTimeout(()=>{
        // API.checkVisitorIPCountry(ipaddr)
        // .then((data) => {
        //   setIPCountry(data.country);
        // })
        // .catch(() => {
        //   alert("error while checking ip-address");
        // })
        // .then(() => {
        //   setCheckingIP(false);
        // });
        setIPCountry("Ethiopia");
        setCheckingIP(false);
      },600);
    }
  };

  const onSubmit = (values) => {
    if(IPCountry){
      // const visitorToBan = {
      //   IPaddress: values.ipaddress,
      //   country: IPCountry,
      //   reason: values.description,
      //   bannedBy: visitorBannedBy
      // }
      const visitorToBan = {
        ip: values.ipaddress,
        countryfrom: IPCountry,
        date: today,
        reason: values.description,
        agent: visitorBannedBy
      }
      setTimeout(()=>{
        addBannedVisitorToStore(visitorToBan);
        // banIPAddress(visitorToBan)
        // .then((response) => {
        //   let { data } = response;
        //   if (data.success) {
        //    console.log(data);
        //   } else {
        //     alert(data.message);
        //   }
        // })
        // .catch((error) => {
        //   console.log(error);
        // })
        // .then(() => {});
        // addBannedVisitorToStore(visitorToBan);
        // handleClose(true);
      },600)
    }
  };

  return (
    <Modal show={true}>
      <div className="modal-title">New Ban</div>
      <div className="modal-body">
        <Formik
          initialValues={{
            ipaddress: "",
            description: ""
          }}
          validationSchema={AddAgentSchema()}
          onSubmit={onSubmit}
        >
          {({ errors, touched, handleChange, isSubmitting}) => (
            <Form>
              <InputWithLabel>
                <label>IP Address </label>
                <Field 
                  className="input-text" 
                  type="text" 
                  name="ipaddress"
                  onChange={(e) => {
                    handleChange(e);
                    checkIPCountry(e.target.value);
                  }}/>
                  {touched.ipaddress && errors.ipaddress ? (
                    <div className="field-msg form-error-msg">{errors.ipaddress}</div>
                  ) : checkingIP ? (
                    <div className="field-msg">Checking IPAddress...</div>
                  ): null}
              </InputWithLabel>

              <InputWithLabel>
                <label>Ban Reason </label>
                <Field className="input-text" type="text" name="description"/>
                {touched.description && errors.description && (
                  <div className="field-msg form-error-msg">{errors.description}</div>
                )}
              </InputWithLabel>

              <div className="modal-footer">
                <Button
                  variant="outlined"
                  size="l"
                  onClick={() => handleClose()}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  size="l"
                  type="submit"
                  disabled={isSubmitting}>
                  {isSubmitting || checkingIP ? <ClipLoader /> : "Save"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default AddToBannedModal;