import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Grid, Paper, Typography } from '@mui/material';
import BSIconButton from './BSIconButton';
// import BSIconButton from './BSIconButton';

function BSScreenHeadercar(props) {
    const { title, firstSidebutton, secondSidebutton, thirdSidebutton } = props
    let backlocate = () => {
        window.history.back();
    }

    return (
        <>
            <Paper elevation={3} fullwidth="true" sx={{
                height: '70px', margin: '10px', display: 'flex',
                alignItems: 'center'
            }}>
                <Grid container  >
                    {/* <Grid item md={1} xs={1} sx={{ textAlign: 'center' }} >
                        {<BSIconButton size="large" icon={<ArrowBackIcon />} sx={{ color: 'blue' }} onClick={backlocate} arialabel="edit" />}
                    </Grid> */}
                    <Grid item md={4} xs={4} sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <Typography variant="h5">{title}</Typography>
                    </Grid>
                    <Grid item md={4} xs={4}  >
                        <Typography variant="h5"></Typography>
                    </Grid>
                    <Grid item md={1} xs={1}  >
                        {thirdSidebutton}
                    </Grid>
                    <Grid item md={1} xs={1}  >
                        {secondSidebutton}

                    </Grid>
                    <Grid item md={1} xs={1} >
                        {firstSidebutton}
                    </Grid>
                </Grid>
            </Paper >
        </>
    )
}

export default BSScreenHeadercar;