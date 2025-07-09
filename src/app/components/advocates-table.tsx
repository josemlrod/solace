import { Advocate } from "@/db/seed/advocates";

const getAdvocates = async () => {
  const res = await fetch("http://localhost:3000/api/advocates");
  const { data } = await res.json();
  return data;
};

export default async function AdvocatesTable() {
  const advocates = await getAdvocates();
  const filteredAdvocates = advocates;

  return (
    <section className="bg-gray-200 overflow-auto border border-black rounded-md">
      <table>
        <thead className="sticky top-0 bg-gray-300">
          <tr>
            <th className="border border-black rounded-md border-t-0 border-l-0">
              First Name
            </th>
            <th className="border border-black rounded-md border-t-0">
              Last Name
            </th>
            <th className="border border-black rounded-md border-t-0">City</th>
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
                    {advocate.specialties.map((s: string) => (
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
  );
}
