import {Box, Divider, List} from "@mui/material";
import {IContact} from "../../../types/models/IContact.ts";
import ContactListItem from "./ContactListItem.tsx";

type TContactListProps = {
    page: number;
    rowsPerPage: number;
    filteredContacts: IContact[] | [];
}

const ContactList = (props: TContactListProps) => {
    const {page, rowsPerPage, filteredContacts} = props;
    return (
        <List sx={{width: '100%', minWidth: 800, padding: 0}}>
            {filteredContacts.length > 0 ? (
                filteredContacts
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((contact: IContact, index: number) => (
                        <Box key={index}>
                            <ContactListItem contact={contact}/>
                            <Divider/>
                        </Box>
                    ))
            ) : (
                <div style={{padding: 10}}>No contacts</div>
            )}
        </List>
    );
}

export default ContactList;