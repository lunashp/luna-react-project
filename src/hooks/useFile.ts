// hooks/useFile.ts
import { useState } from "react";

// 파일을 Base64로 변환하는 함수
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};

const useFile = () => {
  const [file, setFile] = useState<File | null>(null); // 선택된 파일
  const [fileName, setFileName] = useState(""); // 파일 이름

  // 파일 첨부 처리
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // 파일 상태 저장
      setFileName(selectedFile.name); // 파일명 상태 업데이트
    }
  };

  // 파일 다운로드 처리 (localStorage에서 파일 가져오기)
  const handleDownloadFile = (storedFile: string | null, fileName: string) => {
    if (storedFile) {
      // Base64로 저장된 파일을 Blob 형태로 변환
      const byteCharacters = atob(storedFile.split(",")[1]);
      const byteArrays = [];

      for (let offset = 0; offset < byteCharacters.length; offset++) {
        const byte = byteCharacters.charCodeAt(offset);
        byteArrays.push(byte);
      }

      const byteArray = new Uint8Array(byteArrays);
      const fileBlob = new Blob([byteArray], {
        type: "application/octet-stream",
      });

      // Blob을 다운로드할 수 있는 URL로 변환
      const url = window.URL.createObjectURL(fileBlob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName; // 다운로드 시 파일명 설정
      a.click();
      window.URL.revokeObjectURL(url); // URL 해제
    } else {
      alert("파일이 없습니다.");
    }
  };

  return {
    file,
    fileName,
    handleFileChange,
    handleDownloadFile,
    fileToBase64,
  };
};

export default useFile;
