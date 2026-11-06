"use client";

import { useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Modal } from "@/components/ui/modal";
import { UploadDropzone } from "../../../components/datasets/upload-dropzone";

export function UploadModal() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const open = searchParams.get("upload") === "1";

  const close = useCallback(() => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("upload");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  return (
    <Modal open={open} title="New dataset" onClose={close}>
      <UploadDropzone onDone={close} />
    </Modal>
  );
}
