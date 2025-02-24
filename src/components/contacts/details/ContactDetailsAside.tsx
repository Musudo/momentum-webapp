import {Box, Button, Divider, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {useNavigate} from "react-router-dom";
import {dataFieldFormatter} from "../../../utils/DataFormatterUtil";
import {IContact} from "../../../types/models/IContact.ts";
import {formatAddress} from "../../../utils/stringHelpers.ts";

type TProps = {
    contact: IContact;
}

const ContactDetailsAside = ({contact}: TProps) => {
    const phoneNumber1 = dataFieldFormatter(contact.phone1);
    const phoneNumber2 = contact.phone2 ? dataFieldFormatter(contact.phone2) : null;
    const navigate = useNavigate();

    return (
        <Box width={250} minWidth={250}>
            <Box textAlign="left" mb={2}>
                <Button type="button" startIcon={<EditIcon/>}
                        onClick={() => navigate(`/contacts/edit/${contact.id}`)}>Edit Contact</Button>
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">Contact info</Typography>
            <Divider/>
            <Typography variant="body2" marginY={1}>
                {contact.email1}
                {contact.email2 && <><br/>{contact.email2}</>}
                <br/>
                {phoneNumber1}
                {phoneNumber2 && <><br/>{contact.phone2}</>}
            </Typography>
            <Typography variant="subtitle2" fontWeight="bold">Institution info</Typography>
            <Divider/>
            <Typography variant="body2" marginY={1}>
                {contact.institution?.name}
            </Typography>
            <Typography variant="body2" marginY={1}>
                {formatAddress(contact.institution)}
            </Typography>
        </Box>
    );
}

export default ContactDetailsAside;