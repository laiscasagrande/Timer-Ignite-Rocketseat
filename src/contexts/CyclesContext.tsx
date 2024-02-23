import { ReactNode, createContext, useState } from "react"; //o reduce serve para armazenar uma informação e alterar essas informações no futuro. Armazenar informações mais complexas. Via abstrair um pouco o codigo para ficar mais simples na hora de utilizar. Um local fixo para que todas as operações podem acontecer dentro de um estado


interface createCycleData{
    task: string;
    minutesAmount: number;
}

interface Cycle {
  id: string; //cada ciclo que ficara guardado no historico e unico
  task: string;
  minutesAmount: number;
  startDate: Date; //a data que ele ficou ativo
  interruptedDate?: Date; //é opcional porque se apessoa interromper o iclo, essa data nao vai existir
  finishedDate?: Date; //IsActive: boolean //para indicar se esse ciclo e o que esta ativo ou nao. Porem para cada novo ciclo ativo (true) ele teria que parar o anterior (false)
}

interface CyclesContextType {
    cycles: Cycle[]
  //informções que vamos armazenr dentro do contexto
  activeCycle: Cycle | undefined; //os componentes precisam do activeCycle. Se eu nao tenho um ciclo ativo, é undefined
  activeCycleId: string | null;
  amountSecondsPassed: number;
  markCurrentCycleAsFinished: () => void; //é uma função e nao tem retorno
  setSecondsPassed: (seconds: number) => void;
  createNewCycle: (data: createCycleData) => void;
  interruptCurrentCycle: () => void
}

export const CyclesContext = createContext({} as CyclesContextType);

interface CyclesContextProviderProps {
children: ReactNode  //o reactNode é qualquer html válido, coloquei para realizar a tipagem
}

export function CyclesContextProvider({children}:CyclesContextProviderProps ) {
  const [cycles, setCycles] = useState<Cycle[]>([]); //um estado é a unica forma de eu conseguir armazenar alguma informacao no meu componenente que va fazer com que a minha interface reaja a essa informacao. Esse estado vai armazenar uma lista de ciclos. O <> vai armazenar ciclos e um valor de cycle
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null); //quando eu crio um novo ciclo, eu vou tambem setar um ciclo recém criado como sendo meu ciclo ativo. Para eu mmostrar um ciclo ativo, com base no id do ciclo antigo, ela vai percorrer todos os ciclos que eu tenho e me retornar qual e o ciclo que tem o mesmo id do ciclo ativo para conseguir retornar essas informações. Se ele nao retornar nenhum ciclo tivo ele vai retornar nulo. O string indica que e uma linha de strings
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0); //vai armazenar o tanto de segundos que ja se passaram desde que o ciclo se iniciou. Agora da para pegar o tatal de segundos menos o que ja passou e mostra na interface

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);


    
function setSecondsPassed(seconds: number) {//função para o set
    setAmountSecondsPassed(seconds)
    }
    
      function markCurrentCycleAsFinished() { //marcar o ciclo atual como finalizado
    
        setCycles((state) => 
              //percorrer todos os ciclos. Para cada ciclo que eu to percorrendo, se for ativo, eu vou retornar todos os dados do ciclor, porem eu vou adicionar a interruptedDate como sendo a data atual. Senao, eu retorno o ciclo sem alterações
              state.map((cycle) => {
                //o map vai percorrer cada um dos cicclos e vai retornar a alteração de cada ciclo
                if (cycle.id === activeCycleId) {
                  //e com id porque cada ciclo tem uma informação diferente
                  return { ...cycle, finishedDate: new Date() };
                } else {
                  return cycle;
                }
              }),
            )
      }

      function createNewCycle(data: createCycleData) {
        const id = String(new Date().getTime());
     
         const newCycle: Cycle = {
          // criar um novo ciclo aqui dentro
           id, //pegar a data atual e e o getTimer vai retornar o get velho em milissegundos. Isso serve para nao ter id´s repetidos
           task: data.task,
           minutesAmount: data.minutesAmount,
          startDate: new Date(),
         };
     
        setCycles([...cycles, newCycle]); //adicionar esse novo ciclo. Para armazenar em um array, primeiro eu preciso pegar todos os ciclos que eu ja tenho. Eu pego o estado atual da minha variavel de ciclos, copio o estado atual e adiciono um novo ciclo. SEMPRE QUE UMA VARIACAO DE ESTADO DEPENDER DE UM VALR ANTERIOR, EU USO ARROW FUNCTION
         setActiveCycleId(id);
         setAmountSecondsPassed(0); //de quantos segundos se passaram para 0. Se antes coloquei 5 minutos e só rodou 3 segundos e parou no 57, se eu colocar 10 minutos vai comçar do 57, e nao do 59
     
        // reset(); //limpa os campos para o valor original que eu defini no defaultvalues
      }
     
       function interruptCurrentCycle () {
     
         setCycles((state) => 
               //percorrer todos os ciclos. Para cada ciclo que eu to percorrendo, se for ativo, eu vou retornar todos os dados do ciclor, porem eu vou adicionar a interruptedDate como sendo a data atual. Senao, eu retorno o ciclo sem alterações
               state.map((cycle) => {
                 //o map vai percorrer cada um dos cicclos e vai retornar a alteração de cada ciclo
                 if (cycle.id === activeCycleId) {
                   //e com id porque cada ciclo tem uma informação diferente
                   return { ...cycle, finishedDate: new Date() };
                 } else {
                   return cycle;
                 }
               })
             );
         //fazer a contagem parar quando o usuario clicar em interromper
         setActiveCycleId(null); //vai setar de volta para null, pois eu quero que tenha mais nenhum
     
        
       //anotar quais foram interrompidos para ficarem guardados no historico
             }
     
  
      
  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      
      }}
    >
      {children}
      {/*coloquei ao redor do dois componentes qeu precisam dele e a variavel que eles precisam*/}
    </CyclesContext.Provider>
  );
}
