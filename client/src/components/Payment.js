import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext";
import PaymentDetails from "./PaymentDetails";

const Payment = () => {
  const { currentUser } = useContext(UserContext);

  const navigate = useNavigate();

  //   User must be signed in to see payment page
  if (!currentUser) {
    return navigate("/");
  }

  return (
    <div>
      <PaymentDetails />
    </div>
  );
};

export default Payment;
