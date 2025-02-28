import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";

// Định nghĩa kiểu dữ liệu cho props
interface ProductOverviewModalProps {
    open: boolean;
    handleClose: () => void;
}

const ProductOverviewModal: React.FC<ProductOverviewModalProps> = ({
    open,
    handleClose,
}) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle>
                How Ranoar Works
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Typography variant="body1" sx={{ mb: 2 }}>
                    Learn how Ranoar works in 4:12 minutes.
                </Typography>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <video
                        controls
                        style={{
                            width: "920px",
                            height: "520px",
                            borderRadius: "4px",
                        }}
                    >
                        <source
                            src="https://www.w3schools.com/html/mov_bbb.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ProductOverviewModal;
