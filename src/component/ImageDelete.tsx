import React from "react";
import useImageUpload from "../app/hooks/useImageUpload";

interface ImageUploaderProps {
  storageKey?: string; // 기본값 "profileImage"
}

const ImageDelete = ({ storageKey = "profileImage" }: ImageUploaderProps) => {
  const { photo, setPhoto } = useImageUpload(storageKey);

  const handleRemovePhoto = () => {
    localStorage.removeItem(storageKey);
    setPhoto(null);
  };

  return (
    <div>{photo && <button onClick={handleRemovePhoto}>사진 삭제</button>}</div>
  );
};

export default ImageDelete;
