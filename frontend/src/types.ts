export type UserContextType = {
 user: User;
 setUser: (newValue: User) => void;
 submit: any;
 setSubmit: any
}

export type User = {
 id: number;
 // add more stuff here as needed
}