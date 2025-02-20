import {useParams} from "react-router-dom";
import {
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Container,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {stringAvatar, stringColoredAvatar} from "../../../utils/AvatarGeneratorUtil";
import {capitalizeFirstLetter} from "../../../utils/StringFormatterUtil";
import {dataFieldFormatter, nameFormatter} from "../../../utils/DataFormatterUtil";
import {useQuery} from "@tanstack/react-query";
import LoadingComponent from "../../LoadingComponent";
import {ErrorComponent} from "../../ErrorComponent";
import {fetchDataReactQuery} from "../../../utils/HttpRequestUtil";
import {IContact} from "../../../types/models/IContact.ts";
import ContactDetailsAside from "./ContactDetailsAside.tsx";
import {IInstitution} from "../../../types/models/IInstitution.ts";

const ContactDetails = () => {
    let fullName = '';
    let jobTitle = '';
    const {guid} = useParams();

    const {data: contact, status} = useQuery<IContact>(
        ['contact'],
        () => fetchDataReactQuery(`/contacts/${guid}`)
    );

    if (status === 'success') {
        fullName = nameFormatter(contact?.firstName, contact?.lastName);
        jobTitle = dataFieldFormatter(contact?.jobTitle);
    }

    // if (status === 'loading') return <LoadingComponent/>;

    // if (status === 'error') return <ErrorComponent type={ErrorTypesEnum.Fetch}/>;

    return (
        <Container sx={{
            flexGrow: 1,
            overflow: 'auto',
            py: 2
        }} maxWidth='lg'>
            {
                ((fullName === 'na' || jobTitle === 'na') && (
                    <Box mb={1}>
                        <Alert severity="warning">
                            <AlertTitle>Contact information is incomplete</AlertTitle>
                            Please consider to manually fill in missing contact information via edit form
                        </Alert>
                    </Box>
                ))
            }
            <Grid container spacing={3}>
                <Grid >
                    <Paper sx={{
                        p: 2,
                        display: "flex",
                        flexDirection: 'column',
                        minHeight: "25vh"
                    }}>
                        <Typography variant="h5" marginBottom={1}>
                            <ListItem alignItems="flex-start" disablePadding>
                                <ListItemAvatar>
                                    {fullName === "na"
                                        ? <Avatar {...stringAvatar("n a")} />
                                        : <Avatar {...stringColoredAvatar(fullName)} />}
                                </ListItemAvatar>
                                <ListItemText id={contact?.id.toString()}
                                              primary={<Typography variant="h5">{fullName}</Typography>}
                                              secondary={
                                                  contact && contact.institutions.map((i: IInstitution) => (
                                                      <Typography variant="body1">
                                                          {jobTitle === "na" ? jobTitle : `${capitalizeFirstLetter(jobTitle)}`}
                                                          {` at ${i.name}`}
                                                      </Typography>
                                                  ))
                                              }
                                />
                            </ListItem>
                        </Typography>
                    </Paper>
                </Grid>
                <Grid>
                    <Box width={250} minWidth={250}>
                        {contact && <ContactDetailsAside contact={contact}/>}
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ContactDetails;