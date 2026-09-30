import { useEffect, useState } from "react";
import { FORM_EVENT, loadForm, saveForm, type WorkingForm } from "@/lib/working-form";

export function useWorkingForm() {
  const [form, setForm] = useState<WorkingForm | null>(null);

  useEffect(() => {
    setForm(loadForm());
    const refresh = () => setForm(loadForm());
    window.addEventListener(FORM_EVENT, refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener(FORM_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  function commit(next: WorkingForm) {
    saveForm(next);
    setForm(next);
  }

  return { form, commit };
}
