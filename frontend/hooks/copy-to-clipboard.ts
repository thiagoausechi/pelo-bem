import { toast } from "sonner";

export function useCopyToClipboard() {
  const copyToClipboard = async (key: string, value: string) => {
    try {
      if (navigator?.clipboard) {
        await navigator.clipboard.writeText(value);
      } else {
        // Para navegadores mais antigos que não suportam a API Clipboard
        const textArea = document.createElement("textarea");
        textArea.value = value;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      toast.success(`${key} copiado para a área de transferência!`);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error(`Erro ao copiar ${key} para a área de transferência.`);
    }
  };

  return { copyToClipboard };
}
