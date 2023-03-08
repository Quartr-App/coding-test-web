export default interface Company {
    companyId: Number;
    companyName: String;
    companyCountry: String;
    companyTicker: String;
    displayName: String;
    infoUrl: String;
    liveUrl: String;
    logoLightUrl: String;
    logoDarkUrl: String;
    iconUrl: String;
    description: String;
    reportingCurrency: String;
    colorSettings: {
        brandColor: String;
    };
}
