import { Arcana } from "./arcana.type";
import { Direction } from "./direction.type";

export type SvgType = Arcana | Direction
    | "warning-ingredient" | "error-ingredient"
    | "look-at-me" | "ready-people" | "look-neighbour" | "checkbox-checked" | "checkbox-blank"
    | "host" | "table-arrow" | "move-player-clockwise" | "move-player-anticlockwise"
    | "close" | "ingame" | "loading" | "message" | "message-new" | "settings" | "setVisible" | "setHidden" | "theme" | "tuto"
    | "element-black" | "element-white" | "element-red" | "element-green" | "element-blue"
    | "fantasy-black" | "fantasy-white" | "fantasy-red" | "fantasy-green" | "fantasy-blue"
    | "network-black" | "network-white" | "network-red" | "network-green" | "network-blue"
    | "weather-black" | "weather-white" | "weather-red" | "weather-green" | "weather-blue";