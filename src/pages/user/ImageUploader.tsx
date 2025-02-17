import React from "react";
import useImageUpload from "../../hooks/useImageUpload";

interface ImageUploaderProps {
  storageKey?: string; // 기본값 "profileImage"
}

const ImageUploader = ({ storageKey = "profileImage" }: ImageUploaderProps) => {
  const { photo, handleFileChange } = useImageUpload(storageKey);

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {photo ? (
        <img src={photo} alt="Uploaded Preview" width={100} />
      ) : (
        <p>이미지가 선택되지 않았습니다.</p>
      )}
    </div>
  );
};

export default ImageUploader;
