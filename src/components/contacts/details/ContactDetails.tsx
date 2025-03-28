import {useParams} from "react-router-dom";
import {Avatar, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {useQuery} from "@tanstack/react-query";
import ContactDetailsAside from "./ContactDetailsAside.tsx";
import {fetchContact} from "../../../utils/axios/configs/contactAxios.ts";
import {coloredStringAvatar} from "../../../utils/avatarHelpers.ts";
import {CardContainer} from "../../cardContainer.tsx";
import {useTheme} from "@mui/material/styles";

const ContactDetails = () => {
    const {id} = useParams();
    const theme = useTheme();

    const {
        data: contact,
    } = useQuery({
        queryKey: ["contact"],
        queryFn: async () => {
            const res = await fetchContact.get(`/${id}`);
            return res.data;
        },
    });

    if (!contact) {
        return <div>Error</div>;
    }

    return (
        <Grid container spacing={4}>
            <Grid>
                <CardContainer variant="outlined"
                               sx={{
                                   [theme.breakpoints.up('sm')]: {
                                       width: '650px',
                                   },
                               }}>
                    <ListItem alignItems="flex-start" disablePadding>
                        <ListItemAvatar>
                            <Avatar {...coloredStringAvatar(`${contact.firstName} ${contact.lastName}`)} />
                        </ListItemAvatar>
                        <ListItemText id={contact?.id}
                                      primary={
                                          <Typography variant="h5"
                                                      noWrap>{`${contact.firstName} ${contact.lastName}`}</Typography>
                                      }
                                      secondary={
                                          <Typography autoCapitalize="words" variant="body1" noWrap>
                                              {`${contact.jobTitle} at ${contact.institution.name}`}
                                          </Typography>
                                      }
                        />
                    </ListItem>
                </CardContainer>
            </Grid>
            <Grid>
                <ContactDetailsAside contact={contact}/>
            </Grid>
        </Grid>
    );
}

export default ContactDetails;