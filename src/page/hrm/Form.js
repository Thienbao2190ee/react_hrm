import { format } from "date-fns";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { Calendar } from "react-date-range";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import { useSelector } from "react-redux";
import Select from "react-select";
import * as Yup from 'yup';
import { selectHrm } from "../../redux/slice/hrmSlice";
import { toast } from "react-toastify";
const formSchema = Yup.object({
    name: Yup.string().required("Dữ liệu bắt buộc"),
    phone: Yup.string().required("Dữ liệu bắt buộc"),
    email: Yup.string().required("Dữ liệu bắt buộc"),
    hometown: Yup.string().required("Dữ liệu bắt buộc"),
  });

function Form({ handleRemove,handleAdd }) {
  const [dateBirth, setDateBirth] = useState(new Date().getTime());
  const [isDate, setIsDate] = useState(false);
  const [genderID, setGenderID] = useState({ value: 0, label: "Nam" }); 




  const dataGender = [
    { value: 0, label: "Nam" },
    { value: 1, label: "Nữ" },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        name: '',
        phone: '',
        email: '',
        hometown: '',
    },
    validationSchema: formSchema,
  });

  const handleSelectDate = (e) => {
    setDateBirth(new Date(e).getTime());
    setIsDate(false);
  };

  const clickAdd = async () => {
    const action = await formik.validateForm()
    if(Object.keys(action).length === 0){
        const data = {
            name : formik.values.name,
            email : formik.values.email,
            phone : formik.values.phone,
            hometown : formik.values.hometown,
            gender: genderID.value,
            birth:dateBirth
        }
        handleAdd(data)
        
    }
  }
  return (
    <div className="w-[25%] absolute h-screen top-0 bg-white right-0 shadow-2xl">
      <div className="p-2 border-b flex justify-end">
        <button
          type="button"
          onClick={handleRemove}
          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        >
          <i style={{ height: 15 }} className="fi fi-sr-cross-small"></i>
        </button>
      </div>
      <div className="p-2 px-5">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Họ và tên
          </label>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formik.errors.name}
          </p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Email
          </label>
          <input
            type="text"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formik.errors.email}
          </p>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Số điện thoại
          </label>
          <input
            type="text"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formik.errors.phone}
          </p>
        </div>

        <div className="relative">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Ngày sinh
          </label>
          {isDate && (
            <button
              type="button"
              onClick={() => setIsDate(false)}
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-1 text-center inline-flex items-center me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800 absolute top-9 right-0"
            >
              <i style={{ height: 15 }} className="fi fi-sr-cross-small"></i>
            </button>
          )}
          <p
            onClick={() => setIsDate(true)}
            className="bg-gray-50 border  text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
          >
            {dateBirth && format(dateBirth, "dd-MM-yyyy")}
          </p>
          {isDate && (
            <Calendar
              maxDate={new Date()}
              date={dateBirth}
              onChange={handleSelectDate}
            />
          )}
          {/* <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            <span className="font-medium">Oh, snapp!</span> Some error message.
          </p> */}
        </div>
        <div className="relative mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Giới tính
          </label>

          <Select
            value={genderID}
            onChange={(e) => setGenderID(e)}
            options={dataGender}
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Địa chỉ
          </label>
          <input
            type="text"
            name="hometown"
            value={formik.values.hometown}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {formik.errors.hometown}
          </p>
        </div>
      </div>
      <div className="p-2 flex justify-evenly">
        <button
          className="middle none center mr-4 rounded-lg bg-red-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 transition-all hover:shadow-lg hover:shadow-red-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={handleRemove}
        >
          Hủy
        </button>
        <button
          className="middle none center mr-4 rounded-lg bg-green-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-green-500/20 transition-all hover:shadow-lg hover:shadow-green-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          data-ripple-light="true"
          onClick={clickAdd}
          disabled={!formik.isValid}
        >
          Thêm
        </button>
      </div>
    </div>
  );
}

export default Form;
