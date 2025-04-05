import Title from "../Title";
import ImageInput from "../inputFields/ImageInput";
import PasswordField from "../inputFields/PasswordField";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  selectedImage: File | null; // Accept only one image
  setSelectedImage: (image: File | null) => void;
  divWidth: string;
  errors: any;
  register: UseFormRegister<any>;
}

const AccountSetup: React.FC<IProps> = ({
  selectedImage,
  setSelectedImage,
  divWidth,
  errors,
  register,
}) => {
  return (
    <>
      <div className="mt-8">
        {/* <Title infoTitle="Account Setup" /> */}
        <div className="mt-4">
          <div className={`${divWidth}`}>
            <ImageInput
              labelName="Upload Profile Image"
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSetup;
