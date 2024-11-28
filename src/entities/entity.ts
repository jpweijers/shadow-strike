import { Component } from "../components/component";

export class Entity {
  public id: string;
  private components: Map<string, Component> = new Map();

  constructor(id: string) {
    this.id = id;
  }

  addComponent(component: Component): void {
    this.components.set(component.constructor.name, component);
  }

  getComponent<T extends Component, A>(
    componentType: new (...args: A[]) => T,
  ): T {
    return this.components.get(componentType.name) as T;
  }

  hasComponent<A>(componentType: new (...args: A[]) => Component): boolean {
    return this.components.has(componentType.name);
  }

  hasComponents<A>(
    componentTypes: Array<new (...args: A[]) => Component>,
  ): boolean {
    return componentTypes.every((componentType) =>
      this.hasComponent(componentType),
    );
  }
}
