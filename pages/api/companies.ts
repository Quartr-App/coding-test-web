// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const data = {
  data: [
    {
      companyId: 1,
      companyName: "OKEA",
      companyCountry: "NO",
      companyTicker: "OKEA",
      displayName: "OKEA",
      infoUrl: "https://www.okea.no/about/",
      liveUrl: "https://www.okea.no/investor/",
      logoLightUrl:
        "https://files.quartr.com/company-logos/bbac5-2022-12-14-09-26-56.png",
      logoDarkUrl:
        "https://files.quartr.com/company-logos/7514c-2022-12-14-09-26-56.png",
      iconUrl:
        "https://files.quartr.com/company-logos/d0ba4-2022-12-14-09-26-56.png",
      description:
        "OKEA, an oil and gas company, engages in the development and production of oil and gas in the Norwegian continental shelf.",
      reportingCurrency: "NOK",
      colorSettings: {
        brandColor: "#ffffff",
      },
      events: [
        {
          reportUrl:
            "https://files.quartr.com/reports/9aae0-2022-12-14-09-52-59.pdf",
          pdfUrl:
            "https://files.quartr.com/conference-calls/65d33-2022-12-14-09-51-59.pdf",
          eventId: 47033,
          eventTitle: "Q3 2022",
          eventDate: "2022-10-26T08:00:00.000Z",
          qnaTimestamp: 1621,
          fiscalPeriod: "Q3",
          fiscalYear: "2022",
        },
      ],
      isins: [],
    },
    {
      companyId: 2,
      companyName: "Måsøval ",
      companyCountry: "NO",
      companyTicker: "MAS",
      displayName: "Måsøval ",
      infoUrl: "https://www.masoval.no/",
      liveUrl: "https://en.masoval.no/investor",
      logoLightUrl:
        "https://files.quartr.com/company-logos/afb7a-2022-12-14-05-25-34.png",
      logoDarkUrl:
        "https://files.quartr.com/company-logos/1276e-2022-12-14-05-25-34.png",
      iconUrl: null,
      description:
        "Måsøval AS is a Norwegian aquaculture company that focuses on the production and marketing of farmed salmon. The company was founded in 1973 and operates under the parent company Måsøval Eiendom AS.",
      reportingCurrency: "NOK",
      colorSettings: {
        brandColor: "#d96d23",
      },
      events: [
        {
          reportUrl:
            "https://files.quartr.com/reports/f600c-2022-12-15-03-33-18.pdf",
          pdfUrl:
            "https://files.quartr.com/conference-calls/17883-2022-12-15-03-33-18.pdf",
          eventId: 47085,
          eventTitle: "Q3 2022",
          eventDate: "2022-11-15T09:00:00.000Z",
          qnaTimestamp: null,
          fiscalPeriod: "Q3",
          fiscalYear: "2022",
        },
      ],
      isins: [],
    },
    {
      companyId: 3,
      companyName: "Magnora ",
      companyCountry: "NO",
      companyTicker: "MGN",
      displayName: "Magnora ",
      infoUrl: "https://magnoraasa.com/",
      liveUrl: "https://magnoraasa.com/investors/",
      logoLightUrl:
        "https://files.quartr.com/company-logos/1577c-2022-12-14-05-23-20.png",
      logoDarkUrl:
        "https://files.quartr.com/company-logos/f4ae3-2022-12-14-05-23-20.png",
      iconUrl:
        "https://files.quartr.com/company-logos/3e88c-2022-12-14-09-32-50.png",
      description:
        "Magnora ASA operates as a renewable energy development company. It primarily focuses on developing wind and solar PV projects. The company also hold license agreements with the Dana Western Isles and Shell Penguins FPSO. Magnora ASA was incorporated in 2001 and is based in Oslo, Norway.",
      reportingCurrency: "NOK",
      colorSettings: {
        brandColor: "#3c8ab4",
      },
      events: [
        {
          reportUrl:
            "https://files.quartr.com/reports/ad167-2022-12-14-05-44-24.pdf",
          pdfUrl: null,
          eventId: 47032,
          eventTitle: "Q3 2022",
          eventDate: "2022-11-07T09:00:00.000Z",
          qnaTimestamp: null,
          fiscalPeriod: "Q3",
          fiscalYear: "2022",
        },
      ],
      isins: [],
    },
    {
      companyId: 4,
      companyName: "M Vest Water ",
      companyCountry: "NO",
      companyTicker: "MVW",
      displayName: "M Vest Water ",
      infoUrl: "https://mvestwater.com/",
      liveUrl: "https://mvestwater.com/investor-relations/",
      logoLightUrl:
        "https://files.quartr.com/company-logos/59542-2022-12-14-04-19-13.png",
      logoDarkUrl:
        "https://files.quartr.com/company-logos/93818-2022-12-14-04-19-13.png",
      iconUrl: null,
      description:
        "M Vest Water AS develops and sells wastewater treatment solutions. The company offers NorwaCo, an absorbent media used in demountable BOD reduction systems; NorwaFloc, a natural and biodegradable combined flocculant/coagulant; NorwaPol, a polishing reactor; and NorwaMix, a modular and mobile production and dosing unit. It serves upstream and downstream oil and gas, fishing and fish-farming, sludge dewatering, municipal, mining, pulp and paper industries. The company primarily operates in Norway; the Middle East; China, Japan; Malaysia. M Vest Water AS was incorporated in 2017.",
      reportingCurrency: "NOK",
      colorSettings: {
        brandColor: "#1db5e1",
      },
      events: [
        {
          reportUrl:
            "https://files.quartr.com/reports/67990-2022-12-14-04-45-34.pdf",
          pdfUrl:
            "https://files.quartr.com/conference-calls/1390a-2022-12-14-04-45-34.pdf",
          eventId: 47030,
          eventTitle: "Q3 2022",
          eventDate: "2022-11-14T09:00:00.000Z",
          qnaTimestamp: 94500,
          fiscalPeriod: "Q3",
          fiscalYear: "2022",
        },
      ],
      isins: [],
    },
    {
      companyId: 5,
      companyName: "Atria Oyj",
      companyCountry: "FI",
      companyTicker: "ATRAV",
      displayName: "Atria ",
      infoUrl: "https://www.atria.fi/en/group/",
      liveUrl: "https://www.atria.fi/en/group/investors/",
      logoLightUrl:
        "https://files.quartr.com/company-logos/4d347-2022-12-14-03-32-47.png",
      logoDarkUrl:
        "https://files.quartr.com/company-logos/a9a46-2022-12-14-03-32-47.png",
      iconUrl:
        "https://files.quartr.com/company-logos/7e4d2-2022-12-14-03-28-48.png",
      description:
        "Atria Oyj, together with its subsidiaries, produces and markets meat and food products. It offers fresh and processed poultry, beef and pork, prepared foods, fish products, sausages and deli-meats in Finland, Sweden, Denmark, Estonia and Russia. The company also provides retail delicatessen products to Altia group's supermarkets. Atria Oyj was founded in 1903 and is headquartered in Seinäjoki, Finland.\n\n",
      reportingCurrency: "EUR",
      colorSettings: {
        brandColor: "#ed2d4e",
      },
      events: [
        {
          audioUrl: null,
          reportUrl:
            "https://files.quartr.com/reports/557f2-2022-12-14-03-48-55.pdf",
          pdfUrl:
            "https://files.quartr.com/conference-calls/4a3b4-2022-12-14-03-48-55.pdf",
          eventId: 47029,
          eventTitle: "Q3 2022",
          eventDate: "2022-10-26T06:00:00.000Z",
          qnaTimestamp: null,
          fiscalPeriod: "Q3",
          fiscalYear: "2022",
        },
      ],
      isins: [],
    },
  ],
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  res.status(200).json(data);
}
