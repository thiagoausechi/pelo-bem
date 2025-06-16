import { useEffect, useState } from "react";

export function useAvatarPreview(profilePictureFile?: File) {
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();

  // Cria um URL temporário para o preview da imagem
  // e revoga o URL quando o componente é desmontado ou a imagem é alterada
  useEffect(() => {
    let objectUrl: string | null = null;

    if (profilePictureFile instanceof File) {
      objectUrl = URL.createObjectURL(profilePictureFile);
      setPreviewUrl(objectUrl);
    } else {
      setPreviewUrl(undefined);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
        setPreviewUrl(undefined);
      }
    };
  }, [profilePictureFile]);

  const resetPreview = () => setPreviewUrl(undefined);

  return { previewUrl, resetPreview };
}
