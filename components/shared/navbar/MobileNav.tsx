import {
	SheetTrigger,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetDescription,
	Sheet,
} from "@/components/ui/sheet";
import React from "react";

const MobileNav = () => {
	return (
		<Sheet>
			<SheetTrigger>Open</SheetTrigger>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Are you absolutely sure?</SheetTitle>
					<SheetDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</SheetDescription>
				</SheetHeader>
			</SheetContent>
		</Sheet>
	);
};

export default MobileNav;
