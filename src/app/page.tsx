import { Suspense } from "react";
import AdvocatesTable from "./components/advocates-table";
import Search from "./components/search";

export default async function Home() {
  return (
    <main>
      <header className="bg-gray-100 p-4">
        <h1>Solace Advocates</h1>
      </header>

      <div className="container mx-auto py-4 flex flex-col gap-4 h-[calc(100vh-56px)]">
        <Search />
        <Suspense fallback={<div>Loading advocates...</div>}>
          <AdvocatesTable />
        </Suspense>
      </div>
    </main>
  );
}
