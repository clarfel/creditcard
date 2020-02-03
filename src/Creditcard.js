import React from "react";

import Logo from "./assets/creditCard.png";
import "./App.css";

export default class Creditcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayMessage: "Enter the user name",
      userName: "",
      number: "",
      validitydate: "",
      valid: {
        status: true,
        message: ""
      }
    };

    this.handleChange = this.handleChange.bind(this);
    this.cardNumber = this.cardNumber.bind(this);
    this.validateDate = this.validateDate.bind(this);
  }

  handleChange(event) {
    var onlyTextRegex = /[^A-Za-z]/g;
    if (event.target.value.match(onlyTextRegex)) {
      this.setState({ valid: { status: false, message: "Tape only text" } });
    } else if (event.target.value.length > 20) {
      this.setState({ valid: { status: false, message: "Max length 20" } });
    } else {
      this.setState({ userName: event.target.value });
    }
  }
  cardNumber(e) {
    var regex = /^[0-9\b]+$/;
    if (e.target.value.match(regex)) {
      this.setState({ number: e.target.value });
    } else if (e.target.value.length > 16) {
      this.setState({
        valid: {
          status: false,
          message: "The card number has a length of 16 characters"
        }
      });
    } else {
      this.setState({ valid: { status: false, message: "Tape only numbers" } });
    }
  }
  //   let removeNonNumber = (string = "") => string.replace(/[^\d]/g, "");
  // const limitLength = (string = "", maxLength) => string.substr(0, maxLength);
  // formatExpiry = (expiry) => {
  //     const sanitized = limitLength(removeNonNumber(expiry), 4);
  //     if (sanitized.match(/^[2-9]$/)) { return `0${sanitized}`; }
  //     if (sanitized.length > 2) { return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`; }
  //     return sanitized;
  //   };
  validateDate(ev) {
    var inputMonth = ev.target.value.substring(0, 2);
    let result = Array.from(ev.target.value);
    result.push(ev.target.value);
    if (!(inputMonth > 0 && inputMonth < 13))
      return this.setState({
        valid: {
          status: false,
          message: "There is only twelve months"
        }
      });
    else if (result.length >= 2) {
      result.fill("/", 2, 3).pop();
      //   ev.target.value = result;
      return this.setState({ validitydate: result });
    }
    console.log("ev.target.value", ev.target.value);
  }

  render() {
    const { valid } = this.state;
    return (
      <div className="displayCard">
        <div className="bgCreditCard">
          <div className="titleCard">
            <h1>Company name</h1>
          </div>
          <div className="simCard">
            <img
              className="simCardImage"
              src="https://uploads.codesandbox.io/uploads/user/8f10ee4c-10fc-41b7-885a-4b795b293c1d/hh7c-chip.png"
              alt=""
            />
          </div>
          <div className="idCard">
            <h2 className="idCardNumber">{this.state.number}</h2>
          </div>
          <div className="userCard">
            <div className="userCardID"></div>
            <div className="userCardValidation">
              <div className="bloc1">{this.state.validitydate}</div>
            </div>
          </div>
          <div className="userCardDescription">{this.state.userName}</div>
          <div className="cardType">
            <img
              className="simCardImage"
              src="https://uploads.codesandbox.io/uploads/user/8f10ee4c-10fc-41b7-885a-4b795b293c1d/aFYl-visa.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="inputInterface">
          <input
            type="text"
            placeholder={this.state.displayMessage}
            onChange={this.handleChange}
          />
          {!valid.status ? (
            <span style={{ color: "#ff0000" }}>{valid.message}</span>
          ) : null}
          <input
            type="text"
            placeholder="Card number"
            onChange={this.cardNumber}
            maxLength="16"
          />
          <table id="tblForm" border="0" cellpadding="5" cellspacing="0">
            <tr>
              <input
                type="text"
                format="MM/yy"
                placeholder="MM/YY"
                class="date-format"
                onChange={this.validateDate}
                maxLength="4"
              />
            </tr>
          </table>
        </div>
      </div>
    );
  }
}
var isShift = false;
var seperator = "/";
window.onload = function() {
  var tblForm = document.getElementById("tblForm");

  var inputs = document.getElementsByClassName("date-format");

  //Loop through all INPUT elements.
  for (var i = 0; i < inputs.length; i++) {
    //Check whether the INPUT element is TextBox.
    if (inputs[i].type == "text") {
      //Check whether Date Format Validation is required.
      if (inputs[i].className.indexOf("date-format") != 1) {
        //Set Max Length.
        inputs[i].setAttribute("maxlength", 5);

        //Only allow Numeric Keys.
        inputs[i].onkeydown = function(e) {
          return IsNumeric(this, e.keyCode);
        };

        //Validate Date as User types.
        inputs[i].onkeyup = function(e) {
          ValidateDateFormat(this, e.keyCode);
        };
      }
    }
  }
};

function IsNumeric(input, keyCode) {
  if (keyCode == 16) {
    isShift = true;
  }
  //Allow only Numeric Keys.
  if (
    ((keyCode >= 48 && keyCode <= 57) ||
      keyCode == 8 ||
      keyCode <= 37 ||
      keyCode <= 39 ||
      (keyCode >= 96 && keyCode <= 105)) &&
    isShift == false
  ) {
    if (input.value.length == 2 && keyCode != 8) {
      input.value += seperator;
    }

    return true;
  } else {
    return false;
  }
}

function ValidateDateFormat(input, keyCode) {
  var dateString = input.value;
  if (keyCode == 16) {
    isShift = false;
  }
  var regex = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;

  //Check whether valid dd/MM/yyyy Date Format.
  if (regex.test(dateString) || dateString.length == 0) {
    ShowHideError(input, "none");
  } else {
    ShowHideError(input, "block");
  }
}

function ShowHideError(textbox, display) {
  var row = textbox.parentNode.parentNode;
  var errorMsg = row.getElementsByTagName("span")[0];
  if (errorMsg != null) {
    errorMsg.style.display = display;
  }
}
