import Main from "./Main";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { StripeProvider } from "@stripe/stripe-react-native";

const stripeKey =
  "pk_test_51NQWywAnjMTSkMu1VQtR61sAttpUD2y2XPtsur2btEVx7M6HzCd7urPA2gULSfLmgCop18U6zHOxykCQQFBygymY00lmoVX1M2";

export default function App() {
  return (
    <StripeProvider
      publishableKey={stripeKey}
      merchantIdentifier="Benjamin"
      threeDSecureParams={{
        backgroundColor: "#FFFFFF",
        timeout: 5,
      }}
    >
      <Provider store={store}>
        <Main />
      </Provider>
    </StripeProvider>
  );
}
