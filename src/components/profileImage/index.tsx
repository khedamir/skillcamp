import { FC, useRef, useState } from "react";
import Avatar from "../../assets/profile.png";
import { baseUrl } from "../../App";
import { profileService } from "../../services/profile.service";

interface ProfileImageProps {
  profileImage: string | null;
}

const ProfileImage: FC<ProfileImageProps> = ({ profileImage }) => {
  const [newImage, setNewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const objectUrl = URL.createObjectURL(file);
      setNewImage(objectUrl);

      try {
        await profileService.updateProfilePhoto(file);
      } catch (error) {
        console.error("Ошибка при обновлении аватара", error);
      }
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click(); // программный клик по input
  };

  return (
    <div className="profile-image__wrapper">
      <img
        className="profile-image"
        onClick={handleImageClick}
        src={
          newImage
            ? newImage
            : profileImage
            ? `${baseUrl}/images?id=${profileImage}`
            : Avatar
        }
        alt="Profile"
      />
      <input  ref={fileInputRef} type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ProfileImage;
