import { HandPalm, Play } from "phosphor-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"; //integração da biblioteca
import * as zod from "zod"; //a biblioteca
//import { differenceInSeconds } from "date-fns"; //calcula diferença de duas datas em segundos

import {
  HomeContainer,
  StartCountdownButton,
  StopCountdownButton,
} from "./styles";
import { useContext  } from "react";
import { NewCycleForm } from "./components/NewCycleForm";
import { Countdown } from "./components/Countdown";
import { FormProvider } from "react-hook-form";
import { CyclesContext } from "../../contexts/CyclesContext";

//controlled => manter em tempo real a informação que o usuário insere dentro de uma variável do nosso componente. Toda vez que o usuario mudar a informação, escrever um novo texto no input, eu atualizo uma informação no estado contendo esse novo valor para que eu possa ter o valor atualizado do que o usuaio colocou
//oncontrolled => nao mantém as informações dos usuários em tempo real. Em sistemas mais complexos, como uma tela que possui 200 inputs, por exeplo, se eu usasse o controlled, daria muito trabalho atualizar a tela toda, ficaria muito lento



const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, "Informe a tarefa"), //validacao do task: quero que isso seja uma string que tenha no minimo um caracter, e se apessoa nao diigtar esse 1 caracter, sera exibida uma mensagem
  minutesAmount: zod
    .number()
    .min(1, "O ciclo precisa ser de, no mínimo, 5 minutos")
    .max(60, "O ciclo precisa ser de, no máximo, 60 minutos"),
});

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>; //estou inferindo, falando qual é a tipagem de alguma coisa. Nao posso usar uma variavel javascript dentro do typescript, tenho que colocar typeof

export function Home() {
  const { activeCycle, createNewCycle, interruptCurrentCycle } =
    useContext(CyclesContext);

  const newCycleForm = useForm<NewCycleFormData>({
    //quero utilizar um resolver de validacao e tenho que indicar de que forma eu vou validar isso
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      //ela traz a possibilidade de passar qual é o valor inicial de cada campo
      task: "",
      minutesAmount: 0, //valores iniciais dessas variáveis
    },
  }); //varia funcoes e vaiaveis que eu posso usar nos formularios
  //regiter: método que vai adicionar uma input no formulario. A register fala quais campos eu vou ter no meu formulario
  const { handleSubmit, watch, reset } = newCycleForm;

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data);
    reset();
  }

  const task = watch("task"); //observar o task que eu coloquei no input. Agora eu preciso saber o valor do meu campo em tempo real
  const isSubmitDusabled = !task; //vai desabilitar o botao quando eu nao tiver nada dentro da minha task

  //console.log(cycles)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          {" "}
          {/*passa todas as propriedades que eu tenho dentro do newCycleForm como uma propriedade do elemento FormProvider*/}
          <NewCycleForm />{" "}
          {/*está por volta porque e so esse componente que precisa das propriedades do formulario*/}
        </FormProvider>
        <Countdown />

        {activeCycle ? ( //se eu eu ja tiver um ciclo rosando, eu mostro isso. Senao, eu mostro o botao de começar
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            {/*e button porque quando eu clicar aqui nao quero fazer um novo submit*/}
            {/*disabled: somente quando eu nao tiver nada dentro do input*/}
            <HandPalm size={24} /> {/*o hand phosphor react*/}
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton disabled={isSubmitDusabled} type="submit">
            {/*disabled: somente quando eu nao tiver nada dentro do input*/}
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  );
}
