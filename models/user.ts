export type UserDataset = {
	next_id: number,
	users: User[]
}

export type User = {
	id: number;
	username: string;
	password: string;
}