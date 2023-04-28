import React, { useContext, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "./UserContext";
import { useParams } from "react-router-dom";

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
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();
  const { itemId } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    fetch(`/getOneItemOnly/${itemId}`)
      .then((res) => res.json())
      .then((data) => {
        setItem(data.data);
        console.log("data", data.data);
        console.log("itemId", itemId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [itemId]);

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
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            console.log(resData);
            if (resData.status === 200) {
              window.alert(resData.message);

              navigate(`/order/${resData.data._id}`);
            } else {
              window.alert(resData.message);
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
      <h1>Payment Details </h1>
      {item && (
        <div>
          <form onSubmit={handleBuy}>
            <div>
              {" "}
              <h2>Your information</h2>
            </div>

            <div>
              <div>
                <label>Name on Card:</label>

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
                <label>Email Address:</label>
                <input
                  type="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label>Phone Number:</label>
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
                <label>Street:</label>
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
                <label>City:</label>
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
                <label>Province:</label>
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
                <label>Country:</label>
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
                <label>Postal Code:</label>
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
                <label>Card Number:</label>
                <input
                  type="number"
                  title="Credit Card Number"
                  placeholder="____-____-____-____"
                  name="card"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>

              <div>
                <label>Expiration Date:</label>
                <input
                  type="text"
                  title="Expiration Date"
                  placeholder="MM-YY"
                  name="expiration"
                  onChange={(e) => setExpirationDate(e.target.value)}
                />
              </div>

              <div>
                <label>CVV: </label>
                <input
                  type="number"
                  title="CVV"
                  placeholder="CVV"
                  name="CVV"
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
            <div>
              <h3>Your Payment Amount is {item[0].price} $</h3>

              <button type="submit">Submit Payment</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PaymentDetails;
