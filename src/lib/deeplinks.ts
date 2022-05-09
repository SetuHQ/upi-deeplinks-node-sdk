import { bodyHelpers } from "./helpers/body";
import { getURLPath } from "./helpers/endpoint";
import { getAxiosInstance } from "./helpers/request";
import { API, SetuResponseBase, SetuUPIDeepLinkParams } from "./helpers/types";
import {
    CreatePaymentLinkParams,
    CreatePaymentLinkResponse,
    GetPaymentStatusResponse,
    TriggerMockPaymentParams,
    TriggerMockPaymentResponse,
} from "./types";

export const SetuUPIDeepLink = (params: SetuUPIDeepLinkParams) => {
    const collectAxiosInstance = getAxiosInstance(params);

    const createPaymentLink = async (body: CreatePaymentLinkParams): Promise<CreatePaymentLinkResponse> => {
        const { data } = await collectAxiosInstance.post<CreatePaymentLinkResponse>(
            getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE),
            bodyHelpers.createPaymentLink(body)
        );
        return data;
    };

    const expireBill = async (platformBillID: string): Promise<SetuResponseBase> => {
        const { data } = await collectAxiosInstance.post<SetuResponseBase>(
            getURLPath(params.mode, params.authType, API.EXPIRE_BILL).replace("%s", platformBillID)
        );
        return data;
    };

    const getPaymentStatus = async (platformBillID: string): Promise<GetPaymentStatusResponse> => {
        const { data } = await collectAxiosInstance.get<GetPaymentStatusResponse>(
            `${getURLPath(params.mode, params.authType, API.PAYMENT_LINK_BASE)}/${platformBillID}`
        );
        return data;
    };

    const triggerMockPayment = async (body: TriggerMockPaymentParams): Promise<TriggerMockPaymentResponse> => {
        const { data } = await collectAxiosInstance.post<TriggerMockPaymentResponse>(
            getURLPath(params.mode, params.authType, API.TRIGGER_MOCK_PAYMENT),
            bodyHelpers.triggerMockPayment(body)
        );
        return data;
    };

    return {
        createPaymentLink,
        expireBill,
        getPaymentStatus,
        triggerMockPayment,
    };
};
