import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from "@mui/material/Grid2";
import {Stack} from "@mui/material";
import ContactsTable from './ContactsTable.tsx';
import WebsiteTreeView from './WebsiteTreeView.tsx';

const DataView = () => {
    return (
        <Box sx={{width: '100%', maxWidth: {sm: '100%', md: '1700px'}}}>
            <Typography component="h2" variant="h5" sx={{mb: 2}}>
                Details
            </Typography>
            <Grid container spacing={2} columns={12}>
                <Grid size={{xs: 12, lg: 9}}>
                    <ContactsTable/>
                </Grid>
                <Grid size={{xs: 12, lg: 3}}>
                    <Stack gap={2} direction={{xs: 'column', sm: 'row', lg: 'column'}}>
                        <WebsiteTreeView/>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    );
}

export default DataView;