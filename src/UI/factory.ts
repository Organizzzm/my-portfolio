import { IUIComponent } from '~/src/UI/base-component';
import EquationsLayout from '~/src/UI/layout/equations';
import OscillationsLayout from '~/src/UI/layout/oscillations';
import DerivativeLayout from '~/src/UI/layout/derivative';

const classDictionary = {
  equations: EquationsLayout,
  oscillations: OscillationsLayout,
  derivative: DerivativeLayout,
} as const;

export type LayoutListTypes = typeof classDictionary;
export type LayoutListKeys = keyof LayoutListTypes;
export type Options<T extends LayoutListKeys> = ConstructorParameters<LayoutListTypes[T]>[0];

export default class UILayoutFactory {
  static create<T extends LayoutListKeys>(el: T, options?: Options<T>): IUIComponent {
    if (!(el in classDictionary)) {
      throw new Error(`Invalid layout key: ${el}`);
    }
    const x = options as Options<T>;
    return new classDictionary[el](x as any);
  }
}
