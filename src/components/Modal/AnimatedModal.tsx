import { Backdrop, Box, Fade, Modal } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

type Props = {
  children: React.ReactNode;
  handleClose: () => void;
};

export default function AnimatedModal({ children, handleClose }: Props) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in>
        <Box sx={style}>{children}</Box>
      </Fade>
    </Modal>
  );
}
