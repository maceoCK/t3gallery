"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUploadThing } from "~/utils/uploadthing";

// inferred input off useUploadThing
type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
    const $ut = useUploadThing(...args);

    const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const selectedFiles = Array.from(e.target.files);
        const result = await $ut.startUpload(selectedFiles);

        console.log("uploaded files", result);
        // TODO: persist result in state maybe?
    };

    return {
        inputProps: {
            onChange,
            multiple:
                ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
            accept: "image/*",
        },
        isUploading: $ut.isUploading,
    };
};

function UploadSVG() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-6 cursor-pointer"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
        </svg>
    );
}

export default function SimpleUploadButton() {
    const { inputProps, isUploading } = useUploadThingInputProps(
        "imageUploader",
        {
            onClientUploadComplete: () => {
                toast.dismiss("upload-begin");
                toast.success("Upload complete!");
                router.refresh();
            },
            onUploadError: (error) => {
                toast.error(error.message);
            },
            onUploadBegin: () => {
                toast("Uploading...", {
                    duration: Infinity,
                    dismissible: true,
                    id: "upload-begin",
                });
            },
        },
    );
    const router = useRouter();
    if (isUploading) return <div>Uploading...</div>;
    return (
        <div>
            <label htmlFor="upload-button">
                <UploadSVG />
            </label>
            <input
                id="upload-button"
                type="file"
                className="sr-only"
                {...inputProps}
            />
        </div>
    );
}
