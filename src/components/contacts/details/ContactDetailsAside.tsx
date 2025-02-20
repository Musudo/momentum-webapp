import {Box, Button, Divider, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {addressFormatter, dataFieldFormatter} from "../../../utils/DataFormatterUtil";
import {IContact} from "../../../types/models/IContact.ts";

type TProps = {
    contact: IContact;
}

const ContactDetailsAside = ({contact}: TProps) => {
    const phoneNumber1 = dataFieldFormatter(contact.phone1);
    const phoneNumber2 = contact.phone2 ? dataFieldFormatter(contact.phone2) : null;
    const navigate = useNavigate();

    return (
        <Box ml={4} width={250} minWidth={250}>
            <Box textAlign="left" mb={2}>
                <Button type="button" startIcon={<EditIcon/>}
                        onClick={() => navigate(`/contacts/edit/${contact.id}`)}>Edit Contact</Button>
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">Contact info</Typography>
            <Divider/>
            <Box mt={1} mb={2}>
                <Typography variant="body2">
                    {contact.email1}
                    {contact.email2 && <><br/>{contact.email2}</>}
                    <br/>
                    {phoneNumber1}
                    {phoneNumber2 && <><br/>{contact.phone2}</>}
                </Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">Institution</Typography>
            <Divider/>
            <Box mt={1} mb={1}>
                <Typography variant="body2">
                    {contact.institution?.name}
                </Typography>
            </Box>
            <Box mt={1} mb={2}>
                <Typography variant="body2">
                    {addressFormatter(contact.institution.countryCode, contact.institution.city,
                        contact.institution.postalCode, contact.institution.street,
                        contact.institution.buildingNumber)}
                </Typography>
            </Box>
        </Box>
    );
}

export default ContactDetailsAside;