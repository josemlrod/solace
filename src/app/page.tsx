"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [advocates, setAdvocates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    console.log("fetching advocates...");
    fetch("/api/advocates").then((response) => {
      response.json().then((jsonResponse) => {
        setAdvocates(jsonResponse.data);
      });
    });
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value.trim().toLowerCase();
    setSearchTerm(searchTerm);
  };

  const onClick = () => {
    setSearchTerm("");
  };

  const filteredAdvocates =
    searchTerm === ""
      ? advocates
      : advocates.filter((advocate) => {
          if (
            advocate.firstName.toLowerCase().includes(searchTerm) ||
            advocate.lastName.toLowerCase().includes(searchTerm) ||
            advocate.city.toLowerCase().includes(searchTerm) ||
            advocate.degree.toLowerCase().includes(searchTerm) ||
            advocate.specialties.some((specialty) =>
              specialty.toLowerCase().includes(searchTerm)
            )
          ) {
            return true;
          } else if (Number.isNaN(Number(searchTerm))) {
            return false;
          } else {
            return advocate.yearsOfExperience === Number(searchTerm);
          }
        });

  return (
    <main>
      <header className="bg-gray-100 p-4">
        <h1>Solace Advocates</h1>
      </header>

      <div className="container mx-auto py-4 flex flex-col gap-4 h-[calc(100vh-56px)]">
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
            />
            <button
              className="bg-red-500 text-white rounded-md p-2"
              onClick={onClick}
            >
              Reset Search
            </button>
          </div>
        </section>

        <section className="bg-gray-200 overflow-auto border border-black rounded-md">
          <table>
            <thead className="sticky top-0 bg-gray-300">
              <th className="border border-black rounded-md border-t-0 border-l-0">
                First Name
              </th>
              <th className="border border-black rounded-md border-t-0">
                Last Name
              </th>
              <th className="border border-black rounded-md border-t-0">
                City
              </th>
              <th className="border border-black rounded-md border-t-0">
                Degree
              </th>
              <th className="border border-black rounded-md border-t-0">
                Specialties
              </th>
              <th className="border border-black rounded-md border-t-0">
                Years of Experience
              </th>
              <th className="border border-black rounded-md border-t-0">
                Phone Number
              </th>
            </thead>
            <tbody>
              {filteredAdvocates.map((advocate) => {
                return (
                  <tr>
                    <td className="border border-black rounded-md text-center border-l-0">
                      {advocate.firstName}
                    </td>
                    <td className="border border-black rounded-md text-center">
                      {advocate.lastName}
                    </td>
                    <td className="border border-black rounded-md text-center">
                      {advocate.city}
                    </td>
                    <td className="border border-black rounded-md text-center">
                      {advocate.degree}
                    </td>
                    <td className="border border-black rounded-md p-2">
                      <ul className="list-disc list-inside">
                        {advocate.specialties.map((s) => (
                          <li>{s}</li>
                        ))}
                      </ul>
                    </td>
                    <td className="border border-black rounded-md text-center">
                      {advocate.yearsOfExperience}
                    </td>
                    <td className="border border-black rounded-md text-center">
                      {advocate.phoneNumber}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
