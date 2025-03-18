import {Avatar, Chip, ListItem, ListItemAvatar, ListItemButton, ListItemText, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {stringAvatar, coloredStringAvatar} from "../../../utils/avatarHelpers.ts";
import {dataFieldFormatter, nameFormatter} from "../../../utils/DataFormatterUtil";
import {IContact} from "../../../types/models/IContact.ts";

type TContactListItemProps = {
    contact: IContact;
}

const ContactListItem = ({contact}: TContactListItemProps) => {
    const fullName = nameFormatter(contact.firstName, contact.lastName);
    const jobTitle = dataFieldFormatter(contact.jobTitle);
    const phoneNumber = dataFieldFormatter(contact.phone1);
    const navigate = useNavigate();

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={() => navigate(`/contacts/${contact.id}`)}>
                <ListItemAvatar>
                    {fullName === "na" ? <Avatar {...stringAvatar("n a")} /> :
                        <Avatar {...coloredStringAvatar(fullName)} />}
                </ListItemAvatar>
                <ListItemText
                    primary={
                        <Typography component="div">
                            {`${fullName} `}
                            <Chip label={jobTitle} color="default"/>
                        </Typography>
                    }
                    secondary={
                        <>
                            <span style={{color: "black"}}>{`${contact.email1} - ${phoneNumber}`}</span>
                            <br/>
                            <span key={contact.institution.id}>{contact.institution.name}<br/></span>
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
}

export default ContactListItem;