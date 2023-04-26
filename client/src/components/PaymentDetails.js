import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const PaymentDetails = () => {
  const address = {
    street: "",
    city: "",
    province: "",
    country: "",
    postalCode: "",
  };

  const { currentUser } = useContext(UserContext);

  const [phone, setPhone] = useState("");
  const [shippingAddress, setShippingAddress] = useState(address);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handleBuy = (e) => {
    e.preventDefault();

    const data = {
      currentUserId: currentUser._id,
      cardName: currentUser.firstName + " " + currentUser.lastName,
      email: currentUser.email,
      phoneNumber: phone,
      shippingAddress: shippingAddress,
    };

    // Make a POST request to the backend API endpoint to save the cart information to the database
    fetch("/submitPayment", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // send cart session ID to backend
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status > 500) {
        navigate("/errorPage");
      } else {
        res
          .json()
          .then((resData) => {
            if (resData.status === 201) {
              window.alert(resData.message);
              navigate(`/orders/${resData.orderId}`);
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
    <div className="wrapper">
      <h1 className="pageTitle">Payment Details </h1>
      <div className="paymentformAndCartSummaryContainer">
        <form className="form paymentForm" onSubmit={handleBuy}>
          <div>
            {" "}
            <h2>Your information</h2>
          </div>

          <div className="paymentFormLabels">
            <div>
              <label>Name on Card:</label>

              <input
                type="name"
                title="Name on Credit Card"
                placeholder="Name"
                name="name"
              />
            </div>
            <div>
              <label>Email Address:</label>
              <input
                type="email"
                placeholder="Email"
                value={currentUser.email}
              />
            </div>

            <div>
              <label>Phone Number:</label>
              <input
                type="number"
                placeholder="Phone"
                value={currentUser.phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            {" "}
            <h2>Shipping Address</h2>
          </div>
          <div className="paymentFormLabels">
            <div>
              <label>Street Address:</label>
              <input
                type="text"
                value={currentUser.address.street}
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
                value={currentUser.address.city}
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
                value={currentUser.address.province}
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
                value={currentUser.address.country}
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
                value={currentUser.address.postcode}
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
          <div className="paymentFormLabels">
            <div>
              <label>Card Number:</label>
              <input
                type="card"
                title="Credit Card Number"
                placeholder="____-____-____-____"
                name="card"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </div>

            <div>
              <label>Expiration Date:</label>
              <input
                type="expiration"
                title="Expiration Date"
                placeholder="YYYY-MM"
                name="expiration"
                value={expirationDate}
                onChange={(e) => setExpirationDate(e.target.value)}
              />
            </div>

            <div>
              <label>CVV: </label>
              <input
                type="ccv"
                title="CCV"
                placeholder="CCV"
                name="ccv"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
              />
            </div>
          </div>
          <div className="confirmPayment">
            <h3>Your Payment Amount is $</h3>

            <button type="submit">Submit Payment</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentDetails;
