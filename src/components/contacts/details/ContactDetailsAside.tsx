import {Box, Button, Divider, Typography} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from "react-router-dom";
import {dataFieldFormatter} from "../../../utils/DataFormatterUtil";
import {IContact} from "../../../types/models/IContact.ts";
import {formatAddress} from "../../../utils/stringHelpers.ts";

type TContactDetailsAsideProps = {
    contact: IContact;
}

const ContactDetailsAside = ({contact}: TContactDetailsAsideProps) => {

    return (
        <Box
            sx={{
                width: {xs: '100%', md: 300},
                minWidth: {xs: 250},
            }}
        >
            <Box textAlign="left" mb={2}>
                <Button
                    type="button"
                    startIcon={<EditIcon/>}
                    component={Link}
                    to={`/contacts/edit/${contact.id}`}
                >
                    Edit Contact
                </Button>
            </Box>
            <Typography variant="subtitle2" fontWeight="bold">Contact info</Typography>
            <Divider/>
            <Typography variant="body2" marginBottom={2}>
                {contact.email1}
                {contact.email2 && <><br/>{contact.email2}</>}
                <br/>
                {dataFieldFormatter(contact.phone1)}
                {contact.phone2 && <><br/>{dataFieldFormatter(contact.phone2)}</>}
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