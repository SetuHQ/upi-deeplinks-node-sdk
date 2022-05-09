import test from "ava";

import { getURLPath } from "./endpoint";
import { API } from "./types";

test("getUATV1PaymentLinkPath", (t) => {
    t.is(getURLPath("SANDBOX", "JWT", API.PAYMENT_LINK_BASE), "https://uat.setu.co/api/payment-links");
});

test("getProdV2MockPaymentPath", (t) => {
    t.is(
        getURLPath("PRODUCTION", "OAUTH", API.TRIGGER_MOCK_PAYMENT),
        "https://prod.setu.co/api/v2/triggers/funds/addCredit"
    );
});
