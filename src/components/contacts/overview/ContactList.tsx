import {Divider, List} from "@mui/material";
import {Fragment} from "react";
import {IContact} from "../../../types/models/IContact.ts";
import ContactListItem from "./ContactListItem.tsx";

type TProps = {
    page: number;
    rowsPerPage: number;
    filteredContacts: IContact[] | [];
}

const ContactList = (props: TProps) => {
    return (
        <List sx={{ width: '100%', minWidth: 800, bgcolor: 'background.paper' }}>
            {(props.filteredContacts && props.filteredContacts.length > 0) && (
                props.filteredContacts
                    ?.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage)
                    .map((contact: IContact, index: number) => (
                        <Fragment key={index}>
                            <ContactListItem contact={contact}/>
                            <Divider variant="inset" component="li"/>
                        </Fragment>
                    ))
            )}
        </List>
    );
}

export default ContactList;