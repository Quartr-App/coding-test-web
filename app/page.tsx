"use client";

import { useEffect, useState } from "react";
import { Divider } from "@/components/divider";
import { CountryFlag } from "@/components/flag";
import { Heading } from "@/components/heading";
import { List } from "@/components/list";
import { getImageSize } from "@/website/utils/get-image-size";

export default function Home() {
  // TODO: Refactor to use react-query
  const [stuff1, setStuff1] = useState<any>([]);
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const data = await fetch("/api/companies");
      const data2 = await data.json();
      console.log(data2);
      setStuff1(data2);
    };

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, []);

  return (
    <div className="mx-auto max-w-6xl">
      <Heading>Trending companies</Heading>
      <Divider className="my-6" />
      <List items={stuff1}>
        {(stuff1.data || []).map((item: any) => (
          <List.Item className="grid grid-cols-[auto_1fr_auto] gap-3 items-center" divider="soft" key={item.companyId}>
            <List.ItemImage
              alt=""
              className="rounded-lg shadow-sm aspect-3/2 block-auto inline-auto outline-none"
              src={item.logoDarkUrl}
              {...getImageSize({ aspectRatio: "3x2", width: 128 })}
            />
            <div className="flex flex-col gap-1">
              <List.ItemTitle>{item.companyTicker}</List.ItemTitle>
              <List.ItemDetails>{item.displayName}</List.ItemDetails>
              {/* <CountryFlag countryCode={item.companyCountry} /> */}
            </div>
            <div className="flex items-center gap-4">
              {/* Hide on sm? */}
              <div className="flex items-center gap-1">
                <CountryFlag countryCode={item.companyCountry} width={36} />{" • "}
                <List.ItemDetails>{item.reportingCurrency}</List.ItemDetails>
              </div>
              {/* <Dropdown>
                <DropdownButton aria-label="More options" plain>
                  <EllipsisVerticalIcon />
                </DropdownButton>
                <DropdownMenu anchor="bottom end">
                  <DropdownItem href={event.url}>View</DropdownItem>
                  <DropdownItem>Edit</DropdownItem>
                  <DropdownItem>Delete</DropdownItem>
                </DropdownMenu>
              </Dropdown> */}
            </div>
          </List.Item>
        ))}
      </List>
    </div>
  );
}
