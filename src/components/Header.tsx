
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        <span className="text-sm font-medium">EOS Meeting Tracker</span>
      </div>
    </header>
  );
};

export default Header;
