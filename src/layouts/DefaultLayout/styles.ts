import styled from 'styled-components';

export const LayoutContainer = styled.div `
max-width: 74rem ; 
height: calc(100vh - 10rem);//altura total da tela menos um tanto
margin: 5rem auto;//com a altura definida desse jeito, consigo deixar um margin de 5rem
padding: 2.5rem;

background: ${props => props.theme['gray-800']}; //usei o theme para ver as alterações acima
border-radius: 8px;

display: flex; //
flex-direction: column; //temos o header e o conteúdo, um embaixo do outro
`;