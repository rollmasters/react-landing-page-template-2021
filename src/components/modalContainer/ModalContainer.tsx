import React, {ReactNode} from "react";
import styles from "./ModalContainer.module.css";

interface ModalContainerProps {
    isOpen: boolean; // Control whether the modal is visible
    onClose: () => void; // Function to close the modal
    title?: string; // Optional modal title
    children: ReactNode; // Modal content
    footerButtons?: ReactNode; // Optional custom footer buttons
    showYesNo?: boolean; // Show Yes/No buttons
    onYes?: () => void; // Yes button action
    onNo?: () => void; // No button action
    className?: string;
}

export default function ModalContainer(
    {
        isOpen,
        onClose,
        title,
        children,
        footerButtons,
        showYesNo,
        onYes,
        onNo,
        className
    }: ModalContainerProps) {
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose(); // Close the modal when clicking the backdrop
        }
    };

    return (
        <div className={styles.backdrop} onClick={handleBackdropClick}>
            <div className={`${styles.modal} ${className || ''}`}>
                {/* Render the title only if it's provided */}
                {title && (
                    <div className={styles.header}>
                        <h2>{title}</h2>
                        <button className={styles.closeButton} onClick={onClose}>
                            &times;
                        </button>
                    </div>
                )}

                {/* Render the content */}
                <div className={styles.content}>{children}</div>

                {/* Render footer if Yes/No buttons or custom footer is provided */}
                {(showYesNo || footerButtons) && (
                    <div className={styles.footer}>
                        {showYesNo ? (
                            <>
                                <button className={styles.noButton} onClick={onNo}>
                                    Back
                                </button>
                                <button className={styles.yesButton} onClick={onYes}>
                                    Next
                                </button>
                            </>
                        ) : (
                            footerButtons
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
