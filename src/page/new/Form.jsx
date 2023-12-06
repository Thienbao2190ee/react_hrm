import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { selectNew } from "../../redux/slice/newSlice";
import { urlNew } from "../../config/url";
import { Tooltip } from "react-tooltip";
const formSchema = Yup.object({
  title: Yup.string().required("Dữ liệu bắt buộc"),
  des: Yup.string().required("Dữ liệu bắt buộc"),
});

function Form({ handleRemove, handleAdd, isUpdate, handleUpdate }) {
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      des: "",
    },
    validationSchema: formSchema,
  });

  const [errTitle, setErrTitle] = useState(null);

  const dispatch = useDispatch();
  const { dataUpdate, appError } = useSelector(selectNew);
  const [active, setActive] = useState(1);
  const [image, setImage] = useState(null);
  const [errImage, setErrImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageServer, setImageServer] = useState(null);
  useEffect(() => {
    if (dataUpdate && isUpdate) {
      if (dataUpdate?.length > 0) {
        const data = dataUpdate[0];
        formik.setFieldValue("title", data?.title);
        formik.setFieldValue("des", data?.des);
        setActive(data?.active);
        setImage(data?.image);
        setImageServer(data?.image);
      }
    }
  }, [dataUpdate]);

  useEffect(() => {
    if (appError) {
      if (appError.param === "title") {
        setErrTitle(appError.msg);
      }
      if (appError.param === "image") {
        setErrImage(appError.msg);
        setImagePreview(null);
        setImage(null);
      }
    }
  }, [appError]);

  useEffect(() => {
    if (errTitle) {
      setErrTitle(null);
    }
  }, [formik.values.title]);

  const clickSave = async () => {
    const action = await formik.validateForm();

    if (!image) {
      return setErrImage("Ảnh không được bỏ trống");
    }

    if (Object.keys(action).length === 0) {
      const data = {
        title: formik.values.title,
        des: formik.values.des,
        active: active,
        image: image,
      };

      console.log(data);
      const formData = new FormData();
      formData.append("title", formik.values.title);
      formData.append("des", formik.values.des);
      formData.append("active", active ? 1 : 0);
      formData.append("image", image);

      if (isUpdate) {
        handleUpdate(dataUpdate[0]?.id, formData);
      } else {
        handleAdd(formData);
      }
    }
  };
  const handleChangeFile = (e) => {
    console.log(e);
    setErrImage(null);
    const file = e.target.files[0];
    setImage(file);
    // Display image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };
  return (
    <div className="w-[25%] fixed h-screen top-0 z-10 bg-white right-0 shadow-2xl overflow-y-scroll">
      <Tooltip id="my-tooltip">chọn vào để thay đổi ảnh</Tooltip>
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
            tiêu đề
          </label>
          <input
            type="text"
            name="title"
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formik.errors.title || errTitle}
          </p>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-500">
            Mô tả
          </label>
          <input
            type="text"
            name="des"
            value={formik.values.des}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-500 text-gray-900 placeholder-gray-400 mb-2 text-sm rounded-lg focus:ring-gray-500 dark:bg-gray-700 focus:border-gray-500 block w-full p-2.5 "
            placeholder="Nhập..."
          />
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {formik.errors.des}
          </p>
        </div>

        <div className="flex items-center rounded-xl mb-4">
          <input
            id="default-checkbox"
            type="checkbox"
            value=""
            className="w-4 h-4 text-blue-600 bg-gray-100 rounded-xl border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
          <label
            for="default-checkbox"
            className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Trạng thái
          </label>
        </div>

        <div>
          {imagePreview || imageServer ? (
            <div
              data-tooltip-id="my-tooltip"
              onClick={() => {
                setImagePreview(null);
                setImage(null);
                setImageServer(null);
              }}
              className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
            >
              <img
                className="object-cover h-48 w-96"
                src={imagePreview ? imagePreview : urlNew + imageServer}
              />
            </div>
          ) : (
            <div className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                  Chọn file
                </h2>
                <p className="mt-2 text-gray-500 tracking-wide">
                  Tải ảnh PNG, JPG
                </p>
              </label>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleChangeFile}
              />
            </div>
          )}
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            {errImage}
          </p>
        </div>

        {/* <div>
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
          {formik.errors.phone }
          </p>
        </div> */}
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
          onClick={clickSave}
          disabled={!formik.isValid}
        >
          {isUpdate ? "Cập nhật" : "Thêm"}
        </button>
      </div>
    </div>
  );
}

export default Form;
