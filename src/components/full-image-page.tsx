import { clerkClient } from "@clerk/nextjs/server";
import { deleteImageById, getImageById } from "~/server/queries";
import { Button } from "./ui/button";
import { redirect } from "next/navigation";

export default async function PhotoModal(props: { id: number }) {
    let image;
    try {
        image = await getImageById(props.id);
        if (!image) {
            redirect("/");
        }
    } catch (error) {
        redirect("/");
    }
    const uploaderInfo = await clerkClient().users.getUser(image.userId);
    return (
        <div className="flex h-full w-full min-w-0">
            <div className="flex flex-shrink flex-grow items-center justify-center border-r border-gray-200">
                <img
                    src={image.url}
                    alt={image.name}
                    className="max-h-dvh object-contain"
                />
            </div>
            <div className="flex w-48 flex-shrink-0 flex-col bg-slate-800/80">
                <div className="border-b border-gray-200 p-2 text-lg">
                    {image.name}
                </div>
                <div className="flex flex-col gap-2 p-2">
                    <div className="p-2">
                        <div>Uploaded by:</div>
                        <div>
                            {uploaderInfo?.firstName} {uploaderInfo?.lastName}
                        </div>
                    </div>
                    <div className="p-2">
                        <div>Created on:</div>
                        <div>{image.createdAt.toLocaleDateString()}</div>
                    </div>
                    <div className="flex justify-center p-2">
                        <form action={async () => {
                            "use server";
                            await deleteImageById(props.id);
                        }} className="w-full">
                            <Button variant="destructive" width="full" type="submit">
                                Delete
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
