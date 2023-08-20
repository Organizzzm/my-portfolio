import { IUIComponent } from '~/src/UI/base-component';
import ButtonComponent from '~/src/UI/components/button';
import CanvasComponent from '~/src/UI/components/canvas';
import RangeComponent from '~/src/UI/components/range';

const componentsDictionary = {
  button: ButtonComponent,
  canvas: CanvasComponent,
  range: RangeComponent,
};

export type LayoutListTypes = typeof componentsDictionary;
export type LayoutListKeys = keyof LayoutListTypes;
export type Options<T extends LayoutListKeys> = ConstructorParameters<LayoutListTypes[T]>[0];

export default class UIComponetsFactory {
  static create<T extends LayoutListKeys>(el: T, options?: Options<T>): IUIComponent {
    if (!(el in componentsDictionary)) {
      throw new Error(`Invalid component key: ${el}`);
    }

    return new componentsDictionary[el](options);
  }
}
