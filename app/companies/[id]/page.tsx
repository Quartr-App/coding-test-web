import { Metadata } from "next/types";
import { notFound } from "next/navigation";
import { getCompany } from "@/app/lib/actions";
import { DetailCompany } from "@/app/ui";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = (await params).id;
  const { company } = await getCompany(id);

  if (!company) {
    return {
      title: "Company Not Found",
    };
  }

  return {
    title: `${company.companyName} | Company Profile`,
    description:
      company.description ||
      `View detailed information about ${company.companyName}`,
  };
}

export default async function Page(props: Props) {
  const params = await props.params;
  const id = params.id;

  const { company } = await getCompany(id);

  if (!company) {
    return notFound();
  }

  return (
    <>
      <DetailCompany company={company} />
    </>
  );
}
