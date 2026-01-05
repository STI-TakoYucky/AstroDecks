import { Button } from '../ui/button';
import Logo from '/images/AstroDecksLogo.svg'
import { useNavigate } from 'react-router';

export function Navigation() {

  const navigate = useNavigate()

  return (
    <nav className="relative z-10 px-6 py-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div><img src={Logo} alt="AstroDecksLogo" className="min-w-[3rem] h-[3rem] "/> </div>
          <span className="text-2xl font-[600] !font-header-font text-white">
            AstroDecks
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Button onClick={() => navigate('/sign-in')} className='px-6 py-2' variant={"default"} >Get Started</Button>
        </div>
      </div>
    </nav>
  );
}