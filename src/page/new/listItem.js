import { format } from "date-fns";
import { urlNew, urlThumbNew } from "../../config/url";
import { UpdateActiveAction, UpdateByIdAction } from "../../redux/slice/newSlice";
import { useDispatch } from "react-redux";

function ListItem({ data,clickRemove,clickUpdate}) {

  const dispatch = useDispatch()
  return (
    <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
      {data.map((item, index) => (
        <tr key={index}>
          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {(index += 1)}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.title}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            {item.des}
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            <img className="w-10 h-10 object-cover rounded-lg shadow-lg" src={urlThumbNew+item.image} />
          </td>

          <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
            

            <div className="flex items-center rounded-xl mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded-xl border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={Number(item.active)}
            onChange={(e) => {
              dispatch(UpdateActiveAction({id : item.id , data : {active : e.target.checked ? 1 : 0 }}))
            }}
          />
          
        </div>
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
