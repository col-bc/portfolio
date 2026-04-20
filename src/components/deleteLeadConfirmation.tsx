import { deleteLead } from "@/app/lib/handleLeads";
import { Button, CloseButton, Dialog, Portal, Text } from "@chakra-ui/react";

export default function DeleteLeadConfirmation({
    leadId,
    onClose,
    children,
}: {
    leadId: number;
    onClose: () => void;
    children: React.ReactNode;
}) {
    /**
     * Handles the deletion of a lead by calling the deleteLead function with the specified lead ID. After the lead is deleted, it calls the onClose callback to close the confirmation dialog.
     * @returns {Promise<void>} A promise that resolves when the lead deletion process is complete.
     */
    async function handleDelete(): Promise<void> {
        await deleteLead(leadId);
        onClose();
    }

    return (
        <Dialog.Root
            role="alertdialog"
            onOpenChange={(open) => {
                if (!open) {
                    onClose();
                }
            }}>
            <Dialog.Trigger asChild>
                <Button colorPalette="red" variant="outline" size="sm">
                    {children}
                </Button>
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content>
                        <Dialog.Header>
                            <Dialog.Title>Are you sure?</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                            <Text textStyle="body" mb={2}>
                                This action cannot be undone. This will
                                permanently delete the lead with ID {leadId}.
                            </Text>
                            <Text textStyle="body">
                                Please confirm that you want to proceed with
                                this action.
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Dialog.ActionTrigger asChild>
                                <Button variant="outline">Cancel</Button>
                            </Dialog.ActionTrigger>
                            <Button
                                colorPalette="red"
                                variant="subtle"
                                onClick={handleDelete}>
                                Delete
                            </Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
}
