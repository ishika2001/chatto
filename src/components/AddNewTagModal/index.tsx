import { useRef, useState, useEffect } from "react";
import Modal from "../Modal";
import '../../styles/global.css'
import { Link } from "react-router-dom";
import { callAddTagAPI } from "../API/Api";
import { fieldConfigs } from "../../constants/addTagsModal";

interface ErrorMessages {
  tag?: string;
  title?: string;
  details?: string;
  status?: boolean;
  statusError?: string
  createdAt?: string;
  expired_at?: string;
}
export type FormInputField = {
  tag: string;
  title: string;
  details: string;
  status: boolean;
  statusError?: string
  createdAt: string;
  expired_at: string;
};
type AddNewTagModalProps = {
  visible: boolean;
  setVisibleModal: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: () => void;
  // renderTagData: boolean;
  // setRenderTagData: React.Dispatch<React.SetStateAction<boolean>>;
};


const AddNewTagModal = ({ visible, onClose, setVisibleModal }: AddNewTagModalProps) => {
  const [errorMessage, setErrorMessage] = useState<ErrorMessages>({});
  const tagDetailsData = {
    tag: "",
    title: "",
    details: "",
    status: true,
    createdAt: "",
    expired_at: "",
  };

  const initialVal: FormInputField = {
    tag: "",
    title: "",
    details: "",
    status: true,
    createdAt:
      new Date(tagDetailsData?.createdAt)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
        .replace(/-(\d)-/g, "-0$1-")
        .replace(/-(\d)-/g, "-0$1-")
    ,
    expired_at:
      new Date(tagDetailsData?.expired_at)
        .toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })
        .replace(/\//g, "-")
        .replace(/-(\d)-/g, "-0$1-")
        .replace(/-(\d)-/g, "-0$1-")
    ,
  };
  const [formInputField, setFormInputField] = useState<FormInputField>(initialVal);
  useEffect(() => {
    if (visible) {
      setFormInputField(initialVal);
      setErrorMessage({});
    }
  }, [visible]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputField(prevState => ({
      ...prevState,
      [name]: value,
    }));
    setErrorMessage(prevState => ({
      ...prevState,
      [name]: "",
    }));
  };

  const handle = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors: ErrorMessages = {};
    if (formInputField.tag.trim() === "") {
      validationErrors.tag = "Tag field is required.";
    }
    if (formInputField.title.trim() === "") {
      validationErrors.title = "Title field is required.";
    }
    if (formInputField.details.trim() === "") {
      validationErrors.details = "Details field is required.";
    }
    if (formInputField.status === null || formInputField.status === undefined) {
      // validationErrors.status = true;
      // validationErrors.status = "Status field is required.";
    }
    const presentDate = new Date();
    const selectedDate = new Date(formInputField.createdAt);  
    if (isNaN(selectedDate.getTime())) {
      validationErrors.createdAt = "Created Date field is required.";
    } else if (selectedDate.getTime() > presentDate.getTime()) {
      validationErrors.createdAt = "Please select a date on or before the present day.";
    }
    const presentExpiryDate = new Date();
    const selectedExpiryDate = new Date(formInputField.expired_at);
    if (isNaN(selectedExpiryDate.getTime())) {
      validationErrors.expired_at = "Expired Date field is required.";
    } else if (selectedExpiryDate.getTime() > presentExpiryDate.getTime()) {
      validationErrors.expired_at = "Please select a date on or before the present day.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrorMessage(validationErrors);
      return;
    }
    callAddTagAPI(formInputField, setFormInputField, initialVal, setVisibleModal);
  };
  let copyButtonRef = useRef(null);

  return (
    <Modal
      classWrap="max-w-[40rem]"
      classButtonClose="absolute top-6 right-6 w-10 h-10 rounded-full bg-n-2 md:top-5 md:right-5 dark:bg-n-4/25 dark:fill-n-4 dark:hover:fill-n-1"
      visible={visible}
      onClose={onClose}
      initialFocus={copyButtonRef}>
      <form
        className="p-12 md:p-5"
        action=""
        onSubmit={() => console.log("Submit")}>
        <div className="mb-8 h5">Add New Tag</div>

        {fieldConfigs.map((row, rowIndex) => (
          <div className="flex mb-4 justify-around" key={rowIndex}>
            {row.map((field, fieldIndex) => (
              <div
                key={fieldIndex}
                className={field.case_className}>
                <input
                  key={fieldIndex}
                  className="rounded shadow border p-2 focus:bg-transparent dark:focus:bg-transparent dark:text-n-3 text-n-7 outline-n-3 border-n-3 dark:outline-n-3"
                  type={field.type}
                  name={field.name}
                  placeholder={field.label}
                  autoComplete="off"
                  checked={formInputField[field.name as keyof FormInputField] === true}
                  // onFocus={() => (errorMessage[field.name as keyof ErrorMessages] = "")}
                  onChange={handleChange}
                  required={field.validation?.required || false}
                />
                {errorMessage[field.name as keyof ErrorMessages] && (
                  <div className="mt-1 text-red-600">
                    {errorMessage[field.name as keyof ErrorMessages]}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
        <div className="flex justify-end mt-5">
          <Link className="btn-stroke-light mr-3" to={""} onClick={onClose}>
            Cancel
          </Link>
          <Link className="btn-blue" to={""} onClick={handle}>Add</Link>
        </div>
      </form>
    </Modal>
  );
};

export default AddNewTagModal;
