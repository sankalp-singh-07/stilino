'use client';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CirclePlus, LogOut, User } from 'lucide-react';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const UserPanel = ({ session }: { session: Session }) => {
	return (
		<div className="flex justify-center items-center gap-3">
			<Link href={`/content/create`}>
				<button className="px-8 py-2 text-white text-sm font-medium bg-tertiary rounded-full  hover:bg-secondary max-sm:hidden">
					NEW RECIPE
				</button>
				<CirclePlus className="size-7 sm:hidden text-white" />
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Avatar className="size-9 cursor-pointer">
						<AvatarImage
							src={session?.user?.image || ''}
							alt={session?.user?.name || ''}
						/>
						<AvatarFallback>!</AvatarFallback>
					</Avatar>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-56 text-left text-2xl font-semibold bg-primary text-white mt-2 mr-4">
					<DropdownMenuItem className="hover:bg-tertiary cursor-pointer">
						<Link
							href={`/user/${session.id}`}
							className="flex gap-2 items-center"
						>
							<User className="size-4" />
							<span>PROFILE</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuSeparator className="my-1 border-2 border-opacity-10 border-secondary" />
					<DropdownMenuItem
						className="hover:bg-tertiary cursor-pointer"
						onClick={async () => {
							await signOut();
						}}
					>
						<LogOut className="size-4" />
						<span>LOGOUT</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};

export default UserPanel;
