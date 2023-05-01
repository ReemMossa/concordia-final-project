import React, { useContext, useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const PaymentDetails = () => {
  const address = {
    street: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  };

  const { currentUser, setCurrentUser } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState(address);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [isValid, setIsValid] = useState(null);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch(`/getOneItemOnly/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        setTotalPrice(data.data[0].price);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

  const handleCardNumberChange = (event) => {
    const { value } = event.target;
    const newValue = value
      .replace(/\D/g, "") // Remove non-numeric characters
      .slice(0, 16); // Limit to 16 digits

    // Add dashes after the first and second groups of 4 digits
    const formattedValue = newValue
      .replace(/^(\d{4})(\d{1,4})/, "$1-$2")
      .replace(/^(\d{4})-(\d{4})(\d{1,4})/, "$1-$2-$3")
      .replace(/^(\d{4})-(\d{4})-(\d{4})(\d{1,4})/, "$1-$2-$3-$4");

    setCardNumber(formattedValue);
  };

  const handleExpiryDateChange = (event) => {
    let inputValue = event.target.value;
    // Add dash after 2 digits
    if (inputValue.length === 2 && expirationDate.length === 1) {
      inputValue = inputValue + "-";
    }
    setExpirationDate(inputValue);
    setShowErrorMessage(false);
  };

  useEffect(() => {
    if (expirationDate === "") {
      setIsValid(null);
      setShowErrorMessage(false);
      return;
    }
    const timer = setTimeout(() => {
      setIsValid(validateExpiryDate(expirationDate));
      setShowErrorMessage(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, [expirationDate]);

  const validateExpiryDate = (date) => {
    if (!/^\d{2}-\d{2}$/.test(date)) {
      return false;
    }
    const today = new Date();
    const [expiryMonth, expiryYear] = date.split("-");
    const expirationDate = new Date(`20${expiryYear}`, expiryMonth, 0); // the "0" in the day parameter sets the date to the last day of the previous month
    return expirationDate > today;
  };

  const handleBuy = (e) => {
    e.preventDefault();

    const data = {
      userId: currentUser._id,
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingAddress,
      cardNumber,
      expirationDate,
      cvv,
      totalPrice,
    };

    const updatedFormData = {
      ...formData,
      status: "pending",
    };

    fetch("/submitPayment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status > 500) {
        navigate("/errorpage");
      } else {
        res
          .json()
          .then((resData) => {
            if (resData.status === 200) {
              navigate(`/order/${resData.data._id}`);
              fetch(`/editSellerItem/${itemId}`, {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedFormData),
              })
                .then((res) => res.json())
                .then((resData) => {});
            } else {
              setErrorMessage(resData.message);
            }
          })
          .catch((err) => window.alert(err));
      }
    });
  };

  //   User must be signed in to see payment page
  if (!currentUser) {
    return navigate("/");
  }

  return (
    <div>
      <Title>Payment Details </Title>
      {item && (
        <FormDiv>
          {errorMessage && <ErrorMissingInfo>{errorMessage}</ErrorMissingInfo>}
          <Form onSubmit={handleBuy}>
            <div>
              {" "}
              <h2>Your information</h2>
            </div>

            <div>
              <div>
                <label>Name on Card* </label>

                <input
                  type="text"
                  title="firstName"
                  placeholder="First Name"
                  name="firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="lastName"
                  title="lastName"
                  placeholder="Last Name"
                  name="lastName"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label>Email Address* </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>Phone Number* </label>
                <input
                  type="text"
                  placeholder="Phone Number"
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
            </div>

            <div>
              {" "}
              <h2>Shipping Address</h2>
            </div>
            <div>
              <div>
                <label>Street* </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      street: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>City* </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Province* </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      province: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Country* </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label>Postal Code* </label>
                <input
                  type="text"
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <div>
              {" "}
              <h2>Credit Card Information</h2>
            </div>
            <div>
              <div>
                <label>
                  Card number*
                  <input
                    type="text"
                    title="Credit Card Number"
                    placeholder="____-____-____-____"
                    name="card"
                    maxLength={19}
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                  />
                </label>
              </div>

              <div>
                <label>
                  Expiration Date*
                  <input
                    type="text"
                    maxLength="5"
                    placeholder="MM-YY"
                    value={expirationDate}
                    onChange={handleExpiryDateChange}
                  />
                </label>
                {showErrorMessage && !isValid && (
                  <span style={{ color: "red" }}>Invalid expiry date</span>
                )}
                {isValid && (
                  <span style={{ color: "green" }}>Valid expiry date</span>
                )}
              </div>

              <div>
                <label>CVV* </label>
                <input
                  type="text"
                  title="CVV"
                  placeholder="CVV"
                  name="CVV"
                  maxLength={"3"}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h3>Total payment amount is {item[0].price} $</h3>

              <Button type="submit">Submit Payment</Button>
            </div>
          </Form>
        </FormDiv>
      )}
    </div>
  );
};

const Title = styled.p`
  text-align: center;
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
  font-size: 30px;
  color: #23953c;
  margin-top: 2rem;
`;

const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Form = styled.form`
  margin: auto;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
`;

const Button = styled.button`
  background-color: #23953c;
  color: white;
  font-size: 15px;
  padding: 15px 8px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin-top: 2rem;
  cursor: pointer;
`;

const ErrorMissingInfo = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`;

const Error = styled.p`
  color: red;
  font-size: 18px;
`;

export default PaymentDetails;
