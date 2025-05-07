import type { Metadata } from "next";
import EditCampaign from "./page-content";
import { getServerTranslation } from "@/services/i18n";

type Props = {
  params: Promise<{ language: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;

  const { t } = await getServerTranslation(
    params.language,
    "admin-panel-campaigns-edit"
  );

  return {
    title: t("title"),
  };
}

export default function Page() {
  return <EditCampaign />;
}
