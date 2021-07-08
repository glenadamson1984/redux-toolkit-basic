import { DeleteIcon, PhoneIcon, UserIcon } from "../assets/icons";
import { useEffect, useState } from "react";
import { setContacts, deleteContacts } from "../store/contactSlice";
import { useDispatch, useSelector } from "react-redux";

export default function ContactList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();

  const contacts = useSelector((state) => state.contact.contacts);

  const removeContact = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`http://localhost:5000/contacts/${id}`, {
        method: "DELETE",
      });

      dispatch(deleteContacts(id));
    } catch (err) {
      console.log(err);
    }
  };

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/contacts");
      const data = await res.json();
      dispatch(setContacts(data));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => fetchContacts(), []);

  return (
    <div className="contacts-wrapper">
      {contacts?.length > 0 ? (
        contacts.map((contact) => (
          <div key={contact.id} className="contact-card group ">
            <img
              src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
              alt="headshot"
              className="contact-image"
            />
            <div className="relative w-full p-2">
              <button
                className="delete-button"
                onClick={() => removeContact(contact.id)}
              >
                <DeleteIcon />
              </button>

              <div className="flex items-center">
                <UserIcon className="mr-2" />
                <p className="name">{contact.name}</p>
              </div>
              <div className="flex items-center">
                <PhoneIcon className="mr-2" />
                <p className="phone">{contact.phone}</p>
              </div>
            </div>
          </div>
        ))
      ) : contacts ? (
        <p>You have no contacts yet</p>
      ) : loading ? (
        <p>Loading..</p>
      ) : null}
    </div>
  );
}
