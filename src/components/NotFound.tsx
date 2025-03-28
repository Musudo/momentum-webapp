import {Box, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";

const NotFound = () => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "77vh",
                padding: 2,
            }}
        >
            <Grid container spacing={2} direction="column">
                <Typography variant="h1" gutterBottom>
                    404
                </Typography>
                <Typography variant="h4" gutterBottom>
                    Page not found.
                </Typography>
                <Typography variant="body2" gutterBottom>
                    The page you're looking for may have been removed, its name changed,
                    or is temporary unavailable.
                </Typography>
            </Grid>
        </Box>
    );
}


export default NotFound;