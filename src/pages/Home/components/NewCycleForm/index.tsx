import {  useFormContext } from "react-hook-form";
import { FormContainer, MinutesAmountInput, TaskInput } from "./styles";
//import * as zod from 'zod';
//import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { CyclesContext } from "../../../../contexts/CyclesContext";


export function NewCycleForm() {

  const {activeCycle} = useContext(CyclesContext)
  const {register} = useFormContext() //so funciona se houver um provider por volta do compnente que estiver usando o newFormContext
 

    return (
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            disabled={!!activeCycle} //nao deixar o usuario digitar caso tenha algum ciclo ativo. Dois pontos de exclamação porque e um boolean. Se tiver algum valor dentro converte pra true, senao false
            {...register("task")} //recebe o nome do input e ela retorna laguns métodos, nos quais estes métodos sao aqueles que usamos para trabalhar vom inputs.
            //Exemplo: onchange: () => void
            //onBlur: () => void
            //onFocus: () => void
          />
          {/*onchange: cada vez que o usuario trocar o valor desse input, eu salvo isso dentro do meu estado usando a função setTask */}
          <datalist id="task-suggestions">
            {/*lista de sugestões para um input*/}
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="Banana"></option>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register("minutesAmount", { valueAsNumber: true })} //se eu nao colocar {valueAsNumber: true}, ele retorna uam string
          />
          {/*o step indica que o usuario podera pular de 5 em 5 minutos*/}
          <span>minutos.</span>
        </FormContainer>
    )
}