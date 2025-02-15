import { useState, useEffect } from "react";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const useImageUpload = (storageKey: string = "profileImage") => {
  const [photo, setPhoto] = useState<string | null>(null);

  // 페이지 로드 시 localStorage에서 이미지 불러오기
  useEffect(() => {
    const storedImage = localStorage.getItem(storageKey);
    if (storedImage) {
      setPhoto(storedImage);
    }
  }, [storageKey]);

  // 파일 선택 및 저장 함수
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // 파일 크기 제한
      if (file.size > MAX_FILE_SIZE) {
        alert("파일 크기가 너무 큽니다! 5MB 이하의 이미지를 선택해주세요.");
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        localStorage.setItem(storageKey, base64String);
        setPhoto(base64String);
      };

      reader.readAsDataURL(file);
    }
  };

  return { photo, handleFileChange, setPhoto };
};

export default useImageUpload;
