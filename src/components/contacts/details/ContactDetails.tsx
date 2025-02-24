import {useParams} from "react-router-dom";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useQuery} from "@tanstack/react-query";
import ContactDetailsAside from "./ContactDetailsAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {coloredStringAvatar} from "../../../utils/avatarHelpers.ts";

const ContactDetails = () => {
    const {id} = useParams();

    const {
        data: contact,
    } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetchContact.get(`/${id}`);
            return res.data;
        },
    });

    return (
        <Grid container spacing={8} p={4}>
            <Grid size={{xs: 6, md: 8}}>
                <Paper sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: 'column',
                    minHeight: "18vh",
                }}>
                    <Typography variant="h5" marginBottom={1} noWrap>
                        <ListItem alignItems="flex-start" disablePadding>
                            {contact && (
                                <>
                                    <ListItemAvatar>
                                        <Avatar {...coloredStringAvatar(`${contact.firstName} ${contact.lastName}`)} />
                                    </ListItemAvatar>
                                    <ListItemText id={contact?.id}
                                                  primary={<Typography
                                                      variant="h5">{`${contact.firstName} ${contact.lastName}`}</Typography>}
                                                  secondary={
                                                      <Typography autoCapitalize="words" variant="body1">
                                                          {`${contact.jobTitle} at ${contact.institution.name}`}
                                                      </Typography>
                                                  }
                                    />
                                </>
                            )}
                        </ListItem>
                    </Typography>
                </Paper>
            </Grid>
            <Grid size={{xs: 6, md: 4}}>
                {contact && <ContactDetailsAside contact={contact}/>}
            </Grid>
        </Grid>
    );
}

export default ContactDetails;