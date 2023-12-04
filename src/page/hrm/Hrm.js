import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateByIdAction, deleteAction, getAllAction, getByIdAction, registerAction, selectHrm } from "../../redux/slice/hrmSlice";
import { format } from "date-fns";
import ListItem from "./listItem";
import Form from "./Form";
import { toast } from "react-toastify";

function Hrm() {
  const [isForm,setIsform] = useState(false)
  const [isUpdate,setIsUpdate] = useState(false)
  const dispatch = useDispatch();
  const params = {
    keyword: "",
    gender: "",
  };
  const getAll = () => {
    dispatch(getAllAction(params));
  };
  useEffect(() => {
    getAll();
  }, []);

  const { data,loading } = useSelector(selectHrm);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAdd = async (data) => {
    
    const action = await dispatch(registerAction(data))

      const status = registerAction.fulfilled.match(action);
      
      toast[status ? "success" : "error"](action.payload.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if(status){
        setIsform(false)
      }
  }
  const handleRemove = async (id) => {
    const action = await dispatch(deleteAction(id))

      const status = deleteAction.fulfilled.match(action);
      
      toast[status ? "success" : "error"](action.payload.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
  }
  const openFormUpdate = (id) => {
    setIsUpdate(true)
    dispatch(getByIdAction(id))
    setIsform(true)
  } 
  const handleCloseForm = () => {
    setIsUpdate(false)
    setIsform(false)
  }

  const handleUpdate = async (id,data) => {
    const action = await dispatch(UpdateByIdAction({id,data}))

    const status = UpdateByIdAction.fulfilled.match(action);
    
    toast[status ? "success" : "error"](action.payload.msg, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    if(status){
      setIsform(false)
    }
  }

  return (
    <>
      {isForm && <Form isUpdate={isUpdate} handleAdd={handleAdd} handleUpdate={handleUpdate}  handleRemove={handleCloseForm}/>}
      <div className="w-full h-20 bg-red-200 ">
        <div className="px-5 pt-5 flex justify-between">
          <button
            className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => setIsform(true)}
          >
            Thêm +
          </button>
          <div
            className="flex items-center max-w-md bg-white rounded-lg "
            x-data="{ search: '' }"
          >
            <div className="w-full">
              <input
                type="search"
                className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                placeholder="search"
                x-model="search"
              />
            </div>
            <div>
              <button
                type="submit"
                className="flex items-center bg-blue-500 justify-center w-12 h-12 text-white rounded-r-lg"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    // stroke-linecap="round"
                    // stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="px-5 pt-5 ">
          <section className="container shadow-2xl mx-auto rounded-xl overflow-hidden">
            <div className="flex flex-col ">
              <div className=" overflow-x-auto">
                <div className="inline-block min-w-full  align-middle ">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-50 dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Stt
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Tên
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Email
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Số điện thoại
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Ngày sinh
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Nguyên quán
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Ngày tạo
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Ngày cập nhật
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Hành động
                          </th>
                        </tr>
                      </thead>
                      {loading ? (
                        <div>
                        Đang tải
                        </div>
                      ) : data.length > 0 ? (
                          <ListItem clickUpdate={openFormUpdate} clickRemove={handleRemove} data={data}/>
                      ) : (
                        <div>
                          Không có dữ liệu
                        </div>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default Hrm;
