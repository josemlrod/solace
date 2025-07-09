import AdvocatesTable from "./components/advocates-table";
import Search from "./components/search";

const getAdvocates = async () => {
  const res = await fetch("http://localhost:3000/api/advocates");
  const { data } = await res.json();
  return data;
};

export default async function Home() {
  const advocates = await getAdvocates();
  return (
    <div className="container mx-auto py-4 flex flex-col gap-4 h-[calc(100vh-56px)]">
      <Search />
      <AdvocatesTable advocates={advocates} />
    </div>
  );
}
