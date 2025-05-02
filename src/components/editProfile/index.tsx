import { FC, useState } from "react";
import Modal from "../modal";
import { ProfileData } from "../../redux/types";
import Button from "../button";
import InputWrapper from "../inputWrapper";
import { FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";

interface EditProfileProps {
  active: boolean;
  setActive: (active: boolean) => void;
  profileData: ProfileData;
}

const EditProfile: FC<EditProfileProps> = ({
  active,
  setActive,
  profileData,
}) => {
  const [fullName, setFullName] = useState(profileData.full_name);
  const [phone, setPhone] = useState(profileData.phone);
  const [description, setDescription] = useState(profileData.description);

  const onClose = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive(false);
    setFullName(profileData.full_name);
    setPhone(profileData.phone);  
    setDescription(profileData.description);
  };

  const saveData = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActive(false);
  };

  return (
    <div>
      <Modal
        active={active}
        setActive={setActive}
        title="Редактировать профиль"
      >
        <div>
          <form className="edit-profile__form" action="">
            <InputWrapper icon={<FaUser />}>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ФИО"
              />
            </InputWrapper>
            <InputWrapper icon={<FaPhone />}>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Телефон"
              />
            </InputWrapper>
            <InputWrapper icon={<MdDescription />}>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание"
              />
            </InputWrapper>
            <div className="edit-profile__form__buttons">
              <Button onClick={onClose}>Отмена</Button>
              <Button onClick={saveData}>Сохранить</Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditProfile;
