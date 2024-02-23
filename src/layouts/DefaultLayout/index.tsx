//layout padrão
import {Header} from '../../components/Header/index'
import {Outlet} from 'react-router-dom'
import { LayoutContainer } from './styles'

//o layout do header vai ficar fixo para todas as páginas
export function DefaultLayout() {
    return(
            <LayoutContainer>
        <Header/> 
        <Outlet/>
        </LayoutContainer>
    )
}