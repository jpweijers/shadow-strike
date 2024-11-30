import { generateId } from "../utils/helpers";

export abstract class Component {
  public id: string = generateId();
}
