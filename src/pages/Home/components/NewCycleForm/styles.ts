import styled from "styled-components";

export const FormContainer = styled.div`
width: 100%;
display: flex;
align-items: center;
justify-content: center;
gap: 0.5rem;
color: ${props => props.theme['gray-100']};
font-size: 1.125rem;
font-weight: bold;
flex-wrap: wrap;//quando eu diminuir a tela, os elementos diminuirão também, haverá quebra
`;

const BaseInput = styled.input`
background: transparent;
height: 2.5rem;
border: 0;
border-bottom: 2px solid ${(props) => props.theme['gray-500']};
font-weight: bold;
font-size: 1.125rem,; //por mais que eu tenha definido uma font-size no container, tenho que por aqui tambem, porque o inout nao herda o font-size do container. Preciso usar a função inherit para herdar a propriedade do containeer, ou 1.125 mesmo
padding: 0 0.5rem;
color: ${(props) => props.theme['gray-100']};

&:focus{ 
box-shadow: none;//tirar a borda que aparece automático
border-color: ${(props) => props.theme['green-500']}
}

&::placeholder{
    color: ${(props) => props.theme['gray-500']}
}
`;

export const TaskInput = styled(BaseInput)`
flex: 1; //habilidade de o componente crescer mais que o tamanho estipulado; diminuir para um tamanho menor caso seja necessário; ou definir para um tamanho ideal 

&::-webkit-calendar-picker-indicator {
    display: none !important; //tirar a flechinha de sugestoes do input
}

`;
export const MinutesAmountInput = styled(BaseInput)`


`;

