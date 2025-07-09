"use client";

import { Advocate } from "@/db/seed/advocates";
import { useSearchParams } from "next/navigation";

export default function AdvocatesTable({
  advocates,
}: {
  advocates: Advocate[];
}) {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("q");
  const filteredAdvocates =
    searchTerm === "" || !searchTerm
      ? advocates
      : advocates.filter((advocate: Advocate) => {
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
    <section className="bg-gray-200 overflow-auto border border-black rounded-md">
      {filteredAdvocates.length === 0 ? (
        <div className="w-full min-h-80 flex items-center justify-center">
          <p>No advocates found</p>
        </div>
      ) : (
        <table className="w-full">
          <thead className="sticky top-0 bg-gray-300">
            <tr>
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
            </tr>
          </thead>
          <tbody>
            {filteredAdvocates.map((advocate: Advocate, index: number) => {
              return (
                <tr key={index}>
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
                      {advocate.specialties.map((s: string, index: number) => (
                        <li key={index}>{s}</li>
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
      )}
    </section>
  );
}
