import styled from 'styled-components'

export const HeaderContainer = styled.header` //tag header
display: flex;
align-items: center;
justify-content: space-between;

nav {
    display: flex;
    gap: 0.5rem; //espaço entre cada item

    a{
        width: 3rem;
        height: 3rem;

        display: flex;
        justify-content: center;
        align-items: center; //para centralizar o item no meio do tamanho definido de width e height

        color: ${(props) => props.theme['gray-100']};

        border-top: 3px solid transparent;
        border-bottom: 3px solid transparent; //como ele já tem essa borda, quando eu colocar uma borda para aparecer abaixo do ícone, o icone nao vai se deslocar porque nao estamos adicionando uma nova borda, apenas passando de transparent para green
    
    &:hover {
        border-bottom: 3px solid ${(props) => props.theme['green-500']}
    }
    
    &.active {
        color: ${(props) => props.theme['green-500']} //se estiver na página do timer, o icone ficará verde
    }
    } 
}

`;