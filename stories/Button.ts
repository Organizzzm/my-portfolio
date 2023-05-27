import './button.css';

export interface IArgs {
  primary: boolean;
  size: string;
  backgroundColor: string;
  label: string;
  onClick: () => void;
}

export default ({ primary = false, size = 'medium', backgroundColor, label, onClick }: IArgs) => {
  const btn = document.createElement('button');
  btn.type = 'button xxx';
  btn.innerHTML = `${label} <i class="icon-xxx"><i class="icon-xxx">`;
  btn.addEventListener('click', onClick);

  const mode = primary ? 'storybook-button--primary' : 'storybook-button--secondary';
  btn.className = ['storybook-button', `storybook-button--${size}`, mode].join(' ');

  btn.style.backgroundColor = backgroundColor;

  return btn;
};
