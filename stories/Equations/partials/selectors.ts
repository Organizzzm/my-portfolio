import './selectors.css';

interface IList {
  formula: string;
  name: string;
}

export default (list: IList[]) => {
  let html = `<ul class="formulas-list">`;

  const listHTML = list.map((item: IList) => `<li><button>${item.formula}</button></li>`).join('');

  html += listHTML;
  html += '</ul>';

  return html;
};
