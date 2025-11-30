import type { FC } from "react";
import type { Company } from "@/type";

import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronRightIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

import { Divider } from "./divider";
import { truncateString } from "@/utils";

type Props = {
  company: Company;
};
const CompanyItem: FC<Props> = ({ company }) => {
  return (
    <Disclosure as="div" className="p-1" defaultOpen={false}>
      <DisclosureButton className="group flex w-full items-center justify-between p-1">
        <div className="flex flex-row items-center gap-5">
          <Image
            src={company.logoDarkUrl}
            width={70}
            height={70}
            alt={company.displayName}
            className="rounded-lg"
          />
          <div className="flex flex-col justify-between">
            <div className="flex text-sm font-light">
              {company.displayName}
            </div>
            <div className="flex text-xs text-left text-gray-400 font-extralight">
              {truncateString(company.description, 50)}
            </div>
          </div>
        </div>
        <ChevronRightIcon className="size-5 fill-gray/60 group-data-open:rotate-90" />
      </DisclosureButton>
      <Divider />
      <DisclosurePanel className="mt-2 text-sm/5 p-2">
        {company.description}
      </DisclosurePanel>
    </Disclosure>
  );
};

export default CompanyItem;
