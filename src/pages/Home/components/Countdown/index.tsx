import { useContext, useEffect} from "react";
import { CountDownContainer, Separator } from "./styles";
import { differenceInSeconds } from "date-fns";
import { CyclesContext } from "../../../../contexts/CyclesContext";

export function Countdown() {
  const { activeCycle, activeCycleId, markCurrentCycleAsFinished, amountSecondsPassed, setSecondsPassed } =
    useContext(CyclesContext);
  
  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0; //variável que vai converter o numero que é inserido pelo usuario em segundos. Se eu tiver o ciclo ativo, essa variavel vai ser o numero de minutos do ciclo  * 60 (segundos), se eu nao tiver um ciclo ativo, esa variavel vai ser 0

  useEffect(() => {
    let interval: number; //é um number porque adota como um id pra aquele intervalo

    if (activeCycle) {
      //se eu tiver um activeCycle, porque eu só quero fazer a redução das horas se tiver um ciclo ativo
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate
        );

        if (secondsDifference >= totalSeconds) {
          //se o total de segundos que eu percorri já foi igual ou maior que o numero de tempo que o meu ciclo tem, eu marco como completo
          markCurrentCycleAsFinished();

          setSecondsPassed(totalSeconds); //ao invés de terminar com 1, termina com 0

          clearInterval(interval);
        } else {
          //se eu nao completei ainda, eu continuo abaixando
          setSecondsPassed(secondsDifference);
        }
      }, 1000); //a cada 1 segundo
    }
    return () => {
      //quando eu executar o useffect de novo, porque aconteceu alguma mudança nas minhas dependências, eu quero limpar, resetar o que o useffect estava azendo anteriormente para que nao aconteça mais. Serve para deletar os intervalos que eu nao preciso mais
      clearInterval(interval);
    };
  }, [activeCycle, totalSeconds, activeCycleId, markCurrentCycleAsFinished, setSecondsPassed]); //o activeCycle é uma variável externa. Sempre que usarmos uma variável externa, a gente obrigatoriamente precisa incluir essa variavel como uma depend~encia no useffect. Quando o usuario iniciar um novo ciclo, essa variavel vai mudar

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0; //a conta, o tanto que ja passsou. Se o ciclo estiver ativo, vai ser o total de segundos menos o que ja passou. Senao, sera 0

  const minutesAmount = Math.floor(currentSeconds / 60); //vou calcular, a partir do total de segundo, quantos minutos eu tenho desse total de segundos para mostrar em tela. Para nao dar um numero quebrado, o floor sempre vai dar um numero quebrado
  const secondsAmount = currentSeconds % 60; //agora eu calculo quantos segundos restam do final dessa divisão

  const minutes = String(minutesAmount).padStart(2, "0"); //converter o minutesAmount, que é o numero de minutos, para um string. O padStart preenche um string até um tamanho especidifco com algum caractere. A variael minutos tem que ter dois caracteres, se ela nao tiver dois caracteres, eu vou imprimir 0 no começo da string (por isso padSTART)
  const seconds = String(secondsAmount).padStart(2, "0");

  useEffect(() => {
    //atualizar a janela, para aparecer a contagem lá

    if (activeCycle) {
      document.title = `${minutes}:${seconds}`;
    }
  }, [minutes, seconds, activeCycle]);

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      {/*posso trabalhar com strings como se fossem vetores. Qundo eu faço isso, eu pego a letra que está na primeira posição*/}
      <span>{minutes[1]}</span> {/*segunda letra da string*/}
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  );
}
