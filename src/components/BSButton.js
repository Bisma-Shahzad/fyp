import { Button } from "@mui/material";

function BSButton(props) {
    const { variant, title, color, onClick, size } = props;

    return <>
        <Button variant={variant} color={color} onClick={onClick} size={size}>{title}</Button>
    </>
}

export default BSButton;

// For pass component

// <BSButton title="Open" variant="outlined" size="small" />