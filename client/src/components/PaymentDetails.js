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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState(address);
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCvv] = useState("");
  const navigate = useNavigate();

  const handleBuy = (e) => {
    e.preventDefault();

    const data = {
      userId: currentUser._id,
      firstName,
      lastName,
      email,
      phoneNumber,
      shippingAddress,
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
        navigate("/");
      } else {
        res
          .json()
          .then((resData) => {
            if (resData.status === 201) {
              window.alert(resData.message);
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
                type="number"
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
