import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.scss'
import {
  UpdateByIdAction,
  clearData,
  deleteAction,
  getAllAction,
  getByIdAction,
  registerAction,
  selectNew,
} from "../../redux/slice/newSlice";
import ListItem from "./listItem";
import Form from "./Form";
import { toast } from "react-toastify";
import {
  getAllAction as getCityAction,
  selectCity,
} from "../../redux/slice/citySlice";
import Select from "react-select";
import {
  selectDistricts,
  getAllAction as getDistrictsAction,
} from "../../redux/slice/districtsSlice";
import {
  selectWards,
  getAllAction as getWardsAction,
} from "../../redux/slice/wardsSlice";
import Pagination from "../../compoment/Pagination";
import Swal from "sweetalert2";
// import Swal from 'sweetalert2/dist/sweetalert2.js'
// import 'sweetalert2/src/sweetalert2.css'

function New() {
  const [isForm, setIsform] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [acitveID, setActiveID] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);

  const dispatch = useDispatch();
  const params = {
    keyword: keyword,
    active: acitveID?.value,
    offset: 0,
    limit: 10,
  };
  const getAll = () => {
    dispatch(getAllAction(params));
  };
  useEffect(() => {
    getAll();
  }, []);

  const { data, loading, totalPage } = useSelector(selectNew);
  const { data: districts } = useSelector(selectDistricts);
  const { data: wards } = useSelector(selectWards);
  const { data: city } = useSelector(selectCity);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleAdd = async (data) => {
    const action = await dispatch(registerAction(data));

    const status = registerAction.fulfilled.match(action);

    if (status) {
      toast.success(action.payload.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsform(false);
      getAll();
    }
  };
  const handleRemove = async (id) => {
    Swal.fire({
      title: "Bạn có chắc không?",
      text: "Bạn sẽ không thể không phuc dữ liệu này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Có, xóa dữ liệu!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteAction(id));
        getAll();
        Swal.fire({
          title: "Đã xóa",
          text: "Dữ liệu của bạn đã bị xóa.",
          icon: "success",
        });
      }
    });

  };
  const openFormUpdate = (id) => {
    setIsUpdate(true);
    dispatch(getByIdAction(id));
    setIsform(true);
  };
  const handleCloseForm = () => {
    dispatch(clearData([]))
    setIsUpdate(false);
    setIsform(false);
  };

  const handleUpdate = async (id, data) => {
    const action = await dispatch(UpdateByIdAction({ id, data }));

    const status = UpdateByIdAction.fulfilled.match(action);

    
    if (status) {
      toast.success(action.payload.msg, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsform(false);
    }
  };
  const handleSearch = () => {
    params.keyword = keyword;
    params.active = acitveID?.value;
    params.offset = 0;
    setCurrentPage(1);
    getAll();
  };

  const handleRefesh = () => {
    setKeyword("");
    setActiveID(null);
    params.keyword = "";
    params.active = "";
    params.offset = 0;
    params.limit = 10;
    getAll();
  };
  useEffect(() => {
    dispatch(getCityAction());
  }, []);

  //---------pagination-----------
  const handelChangePage = async (page) => {
    params.offset = (page - 1) * params.limit;

    params.keyword = keyword;
    params.active = acitveID?.value;
    getAll();
    setCurrentPage(page);
  };
  const handelPrevPage = async () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      params.offset = (prevPage - 1) * params.limit;

      params.keyword = keyword;
      params.active = acitveID?.value;
      getAll();
      setCurrentPage(prevPage);
    } else {
      return;
    }
  };
  const handelNextPage = async () => {
    if (currentPage < totalPage) {
      const nextPage = currentPage + 1;
      params.offset = (nextPage - 1) * params.limit;

      params.keyword = keyword;
      params.active = acitveID?.value;

      getAll();
      setCurrentPage(nextPage);
    } else {
      return;
    }
  };



  return (
    <>
      {isForm && (
        <Form
          isUpdate={isUpdate}
          handleAdd={handleAdd}
          handleUpdate={handleUpdate}
          handleRemove={handleCloseForm}
        />
      )}
      <div className="w-full h-20 bg-red-200 ">
        <div className="px-5 pt-5 flex justify-between">
          <button
            className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            data-ripple-light="true"
            onClick={() => setIsform(true)}
          >
            Thêm +
          </button>

          <div className="flex items-center">
            <div className="mr-2 w-[200px]">
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderRadius: 8,
                  }),
                }}
                value={acitveID}
                placeholder="Chọn trạng thái"
                onChange={(selectedOption) => {
                  setActiveID(selectedOption);
                }}
                options={[{value:0,label:'Không hoạt động'},{value:1,label:'Hoạt động'}]}
              />
            </div>
            <div
              className="flex items-center max-w-md bg-white rounded-lg "
              x-data="{ search: '' }"
            >
              <div className="w-full">
                <input
                  onChange={(e) => setKeyword(e.target.value)}
                  value={keyword}
                  type="search"
                  className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none"
                  placeholder="search"
                  x-model="search"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex items-center bg-blue-500 justify-center w-9 h-9 text-white rounded-r-lg"
                  onClick={handleSearch}
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
            <button
              className="middle none center ml-2 rounded-lg bg-green-500 py-2.5 px-3 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              data-ripple-light="true"
              onClick={handleRefesh}
            >
              <i style={{ height: 14 }} className="fi fi-rr-refresh"></i>
            </button>
          </div>
        </div>
        <div className="px-5 pt-5 mt-5 ">
          <section className="container shadow-2xl mx-auto rounded-xl overflow-hidden">
            <div className="flex flex-col ">
              <div className=" overflow-x-auto">
                <div className="inline-block min-w-full  align-middle ">
                  <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table
                      style={{ tableLayout: "fixed" }}
                      className="min-w-full divide-y divide-gray-200"
                    >
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
                            Tiêu đề
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Mô tả
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Ảnh
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                          >
                            Trạng thái
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
                        <tbody>
                          <tr>
                            <th>Đang tải</th>
                          </tr>
                        </tbody>
                      ) : data.length > 0 ? (
                        <ListItem
                          clickUpdate={openFormUpdate}
                          clickRemove={handleRemove}
                          data={data}
                        />
                      ) : (
                        <tbody>
                          <tr>
                            <th className="py-2" colSpan={700}>
                              Không có dữ liệu
                            </th>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="flex justify-center mb-10 my-1">
          <Pagination
            totalPage={totalPage}
            onchangePage={handelChangePage}
            currentPage={currentPage}
            onchangePrevPage={handelPrevPage}
            onchangeNextPage={handelNextPage}
          />
        </div>
      </div>
    </>
  );
}

export default New;
