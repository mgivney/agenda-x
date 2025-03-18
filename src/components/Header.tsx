
import { Button } from "@/components/ui/button";
import { ArrowLeft, LogOut, Settings, Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderProps {
  title: string;
  showBackButton?: boolean;
}

const Header = ({ title, showBackButton = false }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <header className="bg-eos-blue text-white py-4 px-6 flex items-center justify-between shadow-md">
      <div className="flex items-center gap-4">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="text-white hover:bg-eos-lightBlue/20"
          >
            <ArrowLeft size={20} />
          </Button>
        )}
        <h1 className="text-xl font-bold">{title}</h1>
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-9 w-9 bg-eos-lightBlue/40 text-white">
                <AvatarImage 
                  src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952" 
                  alt="Profile"
                />
                <AvatarFallback>
                  <User size={16} />
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="end">
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/create-meeting")}>
              <Plus className="mr-2 h-4 w-4" />
              <span>Create Meeting</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/settings")}>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600" onClick={() => console.log("Logged out")}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
