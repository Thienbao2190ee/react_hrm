import { format } from "date-fns";

function ListItem({ data,clickRemove,clickUpdate}) {
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {data.map((item, index) => (
        <tr key={index}>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {(index += 1)}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.name}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.email}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.phone}
          </td>
            <td className="px-4 py-4 text-sm text-center text-gray-500 dark:text-gray-300 whitespace-nowrap">
          {item.gender == 0 ? (
              <span className="bg-sky-300 py-0.5 px-3 rounded-xl text-white">
                Nam

              </span>
          ) : (
            <span className="bg-rose-300 py-0.5 px-3 rounded-xl text-white">

              Nữ
            </span>
          ) }
            </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.birth && format(new Date(item.birth), "dd-MM-yyyy")}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.address},{item.wardName},{item.districtName},{item.cityName}
          </td>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.createdAt && format(new Date(item.createdAt), "dd-MM-yyyy")}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.updatedAt && format(new Date(item.updatedAt), "dd-MM-yyyy")}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <button
            onClick={() => clickUpdate(item.id)}
              type="button"
              className="text-white bg-cyan-300 hover:bg-cyan-400 focus:ring-4 focus:outline-none focus:ring-cyan-100 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
            >
              <i style={{ height: 15 }} className="fi fi-rr-edit"></i>
            </button>
            <button
              type="button"
              onClick={() => clickRemove(item.id)}
              className="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2"
            >
              <i style={{ height: 15 }}  className="fi fi-rr-trash"></i>
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}

export default ListItem;
