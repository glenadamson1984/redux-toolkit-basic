import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const contactSlice = createSlice({
  name: "contacts",
  initialState: {
    contacts: null,
  },
  reducers: {
    setContacts: (state, action) => {
      state.contacts = action.payload;
    },
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    deleteContacts: (state, action) => {
      state.contacts = state.contacts.filter((c) => c.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setContacts, addContact, deleteContacts } = contactSlice.actions;

export default contactSlice.reducer;
