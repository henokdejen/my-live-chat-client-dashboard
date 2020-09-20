import React, { useState } from "react";
import Switch from "react-switch";

import { CirclePicker, SketchPicker } from "react-color";
import InputText from "../controls/inputText/InputText";

import "./chatWidgetAppearance.scss";
import { PopupContainer } from "../controls/popupContainer/PopupContainer";
import { changeWidgetSettings } from "../../store/actions/widget";
import { connect } from "react-redux";
import { Form, Formik } from "formik";
import { FormSubmitBar } from "../form-submit-bar/FormSubmitBar";
import Select from "react-select";
import * as API from "../../API/base";

const langauages = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "amh",
    label: "Amharic",
  },
  {
    value: "tig",
    label: "Tigregna",
  },
  {
    value: "oro",
    label: "Afaan Oromo",
  },
  {
    value: "gur",
    label: "Guragegna",
  },
];

const BasicWidgetColors = ["#f00", "#0f0", "#00f", "#ff0", "#0ff"];

const WidgetColorPicker = ({ activeColor, onColorSelected }) => {
  const [showColorPicker, setshowColorPicker] = useState(false);

  const [color, setcolor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  return (
    <div className="widget_color_selector">
      {BasicWidgetColors.map((color, index) => (
        <span
          className={
            "widget_color_selector__color " +
            (index == 2 ? "widget_color_selector__color-active" : "")
          }
          style={{
            backgroundColor: color,
          }}
          key={index}
        />
      ))}

      <span
        className="widget_color_selector__color"
        style={{
          backgroundColor: "#f1f1f1",
        }}
        onClick={(e) => setshowColorPicker(true)}
      ></span>

      {showColorPicker && (
        <PopupContainer
          className="pop-color-picker"
          handleClose={(e) => {
            setshowColorPicker(false);
          }}
        >
          <SketchPicker
            color={color}
            onChange={(color) => {
              console.log("Selected Color", color);
              setcolor(color.hex);
            }}
          />
        </PopupContainer>
      )}
    </div>
  );
};

const enableDisablesSettings = [
  {
    lable: "Wait Time",
    name: "waitTime",
    value: true,
  },
  {
    lable: "Agent Type Notification",
    name: "showAgentTyping",
    value: true,
  },
  {
    lable: "Sound Notification",
    name: "soundNotification",
    value: true,
  },
  {
    lable: "Message Preview",
    name: "sneakPreview",
    value: true,
  },
  {
    lable: "Visitor Typing",
    name: "showVisitorTyping",
    value: true,
  },
  {
    lable: "Browser Tab Notification",
    name: "browserTabNotification",
    value: true,
  },
  {
    lable: "Hide Agent When Offline",
    name: "hideWidgetWhenOffline",
    value: true,
  },
  {
    lable: "Hide Widget On Mobile",
    name: "hideWidgetOnMobile",
    value: true,
  },
  {
    lable: "File Upload",
    name: "fileUploadAllowed",
    value: true,
  },

  {
    lable: "Chat Rating",
    name: "chatRatingAllowed",
    value: true,
  },
  {
    lable: "Emoji In Chat",
    name: "emojiInChatAllowed",
    value: true,
  },
];

const ChatWidgetAppearance = ({ widgetSettings, changeWidgetSettings }) => {
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      API.updateProjectSettings(values)
        .then((data) => {
          if (data.success) {
            alert("Updated!");
          } else {
            alert(data.message);
          }
          setSubmitting(false);
        })
        .catch((error) => {
          console.log(error);
          setSubmitting(false);
        })
        .then(() => {});
    }, 1000);
  };

  return (
    <div className="chat-widget-appearance">
      <div className="appearance-settings">
        <Formik onSubmit={onSubmit} initialValues={widgetSettings}>
          {({
            errors,
            touched,
            handleChange,
            resetForm,
            isSubmitting,
            values,
            setFieldValue,
          }) => (
            <Form>
              <div className="appearance-sub-section">Basic Appearnace</div>

              <div className="setting-item widget-color">
                <div className="setting-lable"> Widget Color </div>
                <div className="setting-value">
                  <WidgetColorPicker activeColor="#ff0" />
                </div>
              </div>

              <div className="setting-item widget-language">
                <div className="setting-lable">Language</div>
                <div className="setting-value">
                  {/* <select className="basic-select widget-language">
                    <option>Henok </option>
                    <option>Henok </option>
                    <option>Henok </option>
                  </select> */}
                  <Select
                    className="status-selector"
                    classNamePrefix="select"
                    defaultValue={langauages[0]}
                    options={langauages}
                  />
                </div>
              </div>

              <div className="setting-item widget-language">
                <div className="setting-lable">Initial From</div>
                <div className="setting-value">
                  <InputText />
                </div>
              </div>

              <div className="appearance-sub-section">Basic Settings</div>
              {enableDisablesSettings.map((setting) => (
                <div className="setting-item">
                  <div className="setting-lable">{setting.lable}</div>
                  <div className="setting-value">
                    <Switch
                      onChange={(checked) => {
                        //   setwidgetActive(checked);
                        setFieldValue(setting.name, checked);
                      }}
                      checked={values[setting.name]}
                      className="react-switch"
                      height={20}
                      width={38}
                      uncheckedIcon={false}
                      checkedIcon={false}
                    />
                  </div>
                </div>
              ))}
              <FormSubmitBar
                buttonSize="sm"
                isSubmitting={isSubmitting}
                onCancel={(e) => {
                  e.preventDefault();
                  resetForm();
                }}
              />
            </Form>
          )}
        </Formik>
      </div>
      <div className="widget-preview-wrapper"></div>
    </div>
  );
};

const mapStateToProps = (state) => {
  let { settings } = state.basicState.projectInfo;
  return { widgetSettings: settings };
};

const mapDispatchToProps = (dispatch) => ({
  changeWidgetSettings: (change) => {
    dispatch(changeWidgetSettings(change));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatWidgetAppearance);
