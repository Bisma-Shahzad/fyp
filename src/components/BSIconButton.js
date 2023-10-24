import { IconButton } from "@mui/material";

function BSIconButton(props) {
    const { arialabel, size, icon, onClick, sx } = props

    return <>
        <IconButton aria-label={arialabel} size={size} onClick={onClick} sx={sx}>
            {icon}
        </IconButton>
    </>
}

export default BSIconButton;

// For pass Component

// <BSIconButton size="large" icon={<DeleteIcon />} />