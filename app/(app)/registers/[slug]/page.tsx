import { REGISTERS_TABS } from "@client/pages/registers/tabs";
import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ slug: keyof typeof REGISTERS_TABS }>;
}

export default async function RegisterContentPage({ params }: Props) {
  const { slug } = await params;
  const content = REGISTERS_TABS[slug]?.content;

  if (content) return content;

  redirect(`/404?from=${slug}`);
}
