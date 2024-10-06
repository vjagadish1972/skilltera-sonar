import mixpanel from 'mixpanel-browser';
let mixpanelToken
if (process.env.NODE_ENV == "production") {
    mixpanelToken = "037fdbda99bc3fe62a94ec541b06d749";
} else {
    mixpanelToken = "0f1fe0bf18fe8b02eb21c396b1f4153b";
}

mixpanel.init(mixpanelToken, { debug: true, ignore_dnt: true });
export default function Mixpanel(purpose, buttonName, candidateEmailId, comapnayEmailId, referrerEmailId) {
    mixpanel.track(purpose, {
        'source': buttonName,
        'candidateEmailId': candidateEmailId,
        'companyEmailId': comapnayEmailId,
        'referrerEmailId': referrerEmailId,
    });
}