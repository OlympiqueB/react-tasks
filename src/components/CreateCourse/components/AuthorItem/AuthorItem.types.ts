export interface AuthorItemProps {
	name: string;
	id: string;
	isAddDisabled?: boolean;
	onAddClick?(id: string): void;
	onDeleteClick?(id: string): void;
}
