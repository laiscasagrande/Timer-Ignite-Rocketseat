import { HeaderContainer } from './styles'
import logo from '../../assets/Logo.svg'
import {Timer, Scroll} from 'phosphor-react'
import { NavLink } from 'react-router-dom';

export function Header() {
  return (
    <HeaderContainer>
        <img src={logo} alt=""/>
      <nav>
        <NavLink to="/" title='Timer'> <Timer size={24}/> </NavLink> {/*uma barra só porque definimos isso para a home*/}
        <NavLink to="/history" title='Histórico'> <Scroll size={24}/> </NavLink>
      </nav>
    </HeaderContainer>
  );
}
