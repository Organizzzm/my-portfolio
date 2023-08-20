import { IUIComponent } from '~/src/UI/base-component';
import EquationsLayout from '~/src/UI/layout/equations';
import OscillationsLayout from '~/src/UI/layout/oscillations';
import TangentLayout from '~/src/UI/layout/tangent';
import TrigCircleLayout from '~/src/UI/layout/trig-circle';

const layoutDictionary = {
  equations: EquationsLayout,
  oscillations: OscillationsLayout,
  tangent: TangentLayout,
  trigcircle: TrigCircleLayout,
} as const;

export type LayoutListTypes = typeof layoutDictionary;
export type LayoutListKeys = keyof LayoutListTypes;
export type Options<T extends LayoutListKeys> = ConstructorParameters<LayoutListTypes[T]>[0];

export default class UILayoutFactory {
  static create<T extends LayoutListKeys>(el: T, options?: Options<T>): IUIComponent {
    if (!(el in layoutDictionary)) {
      throw new Error(`Invalid layout key: ${el}`);
    }

    /** @todo: Try to figure out how to use Union types insted Any. */
    return new layoutDictionary[el](options as any);
  }
}
