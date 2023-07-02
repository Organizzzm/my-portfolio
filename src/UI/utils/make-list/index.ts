/**
 * It makes list without ul>li elements.
 */
export default <T, U extends HTMLElement>(arr: T[], fn: (i: T) => U) => {
  const fragment = document.createDocumentFragment();

  arr.forEach((item: T) => {
    fragment.appendChild(fn(item));
  });

  return fragment;
};
