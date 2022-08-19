interface ICommand
{
	name: string;
	exec(...args: any[]): void;
}