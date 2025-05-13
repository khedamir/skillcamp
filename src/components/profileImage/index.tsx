import { FC, useState } from "react";
import Avatar from "../../assets/profile.png";
import { baseUrl } from "../../App";
import { profileService } from "../../services/profile.service";

interface ProfileImageProps {
  profileImage: string | null;
}

const ProfileImage: FC<ProfileImageProps> = ({ profileImage }) => {
  const [newImage, setNewImage] = useState<File | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);

      try {
        await profileService.updateProfilePhoto(file);
      } catch (error) {
        console.error("Ошибка при обновлении аватара", error);
      }
    }
  };

  return (
    <div>
      <img
        className="profile-image"
        src={newImage || profileImage ? `${baseUrl}/images?id=${profileImage}` : Avatar}
        alt="Profile"
      />
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default ProfileImage;
