//arquivo que só tem tipagens
import 'styled-components'; //eu importei porque eu quero aprimorar, e não criar um novo
import { defaultTheme} from '../styled/themes/default'

type ThemeType = typeof defaultTheme;

declare module 'styled-components'{
    export interface defaultTheme extends ThemeType {}

}