import { Component } from "../components/component";
import { generateId } from "../utils/helpers";

export class Entity {
  public id: string;
  private components: Map<string, Component> = new Map();

  constructor() {
    this.id = generateId();
  }

  addComponent(component: Component): void {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T extends Component, Args extends unknown[]>(
    componentType: new (...args: Args) => T,
  ): T | undefined {
    return this.components.get(componentType.name) as T;
  }

  hasComponent<Args extends unknown[]>(
    componentType: new (...args: Args) => Component,
  ): boolean {
    return this.components.has(componentType.name);
  }

  hasComponents<Args extends unknown[]>(
    componentTypes: Array<new (...args: Args) => Component>,
  ): boolean {
    return componentTypes.every((componentType) =>
      this.hasComponent(componentType),
    );
  }

  removeComponent<Args extends unknown[]>(
    componentType: new (...args: Args) => Component,
  ): void {
    this.components.delete(componentType.name);
  }
}
