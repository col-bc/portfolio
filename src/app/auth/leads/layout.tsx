import { Toaster } from "@/components/ui/toaster";

export default function LeadsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
            <Toaster />
        </>
    );
}
