import { Suspense } from "react";
import AdvocatesTable from "./components/advocates-table";
import Search from "./components/search";

const getAdvocates = async () => {
  const res = await fetch("http://localhost:3000/api/advocates");
  const { data } = await res.json();
  return data;
};

export default async function Home() {
  return (
    <main>
      <header className="bg-gray-100 p-4">
        <h1>Solace Advocates</h1>
      </header>

      <div className="container mx-auto py-4 flex flex-col gap-4 h-[calc(100vh-56px)]">
        <Search />
        <Suspense fallback={<div>Loading...</div>}>
          <AdvocatesTable />
        </Suspense>
      </div>
    </main>
  );
}
