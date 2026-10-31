import { getAllData } from "@/components/data/getData";
import { StudiosExplorer } from "@/components/studios/StudiosExplorer";

type StudiosPageProps = {
  searchParams: Promise<{
    category?: string | string[];
    search?: string | string[];
  }>;
};

const StudiosPage = async ({ searchParams }: StudiosPageProps) => {
  const { category, search } = await searchParams;
  const selectedCategory = Array.isArray(category) ? category[0] : category;
  const selectedSearch = Array.isArray(search) ? search[0] : search;
  const studios = await getAllData();

  return (
    <StudiosExplorer
      studios={studios ?? []}
      initialCategory={selectedCategory ?? ""}
      initialSearch={selectedSearch ?? ""}
      loadError={studios === null}
    />
  );
};

export default StudiosPage;
