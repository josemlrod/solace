"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    const params = new URLSearchParams(searchParams);
    if (value === "") {
      params.delete("q");
    } else {
      params.set("q", value);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const onClick = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("q");
    router.push(`${pathname}?${params.toString()}`);
  };

  const searchTerm = searchParams.get("q");

  return (
    <section className="flex justify-between gap-4 items-center">
      <div className="flex flex-col gap-2 [max-width:300px]">
        <h1 className="text-2xl font-bold">Search</h1>
        <h2 className="text-sm font-semibold text-gray-600">
          You can search by name, city, degree, specialties, or years of
          experience
        </h2>
      </div>
      <div className="flex gap-2 grow justify-end">
        <input
          className="border border-gray-600 rounded-md flex-grow px-2"
          placeholder="eg: Alice, Los Angeles, Chronic Pain, 10..."
          onChange={onChange}
          value={searchTerm ?? ""}
          type="text"
        />
        <button
          className="bg-red-500 text-white rounded-md p-2"
          onClick={onClick}
        >
          Reset Search
        </button>
      </div>
    </section>
  );
}
