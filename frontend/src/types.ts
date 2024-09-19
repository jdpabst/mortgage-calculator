export type UserContextType = {
 user: User;
 setUser: (newValue: User) => void;
 submit: any;
 setSubmit: any;
 selectedRadio: any;
 setSelectedRadio: any;
 input: any;
 setInput: any;
}

export type User = {
 id: number;
 // add more stuff here as needed
}