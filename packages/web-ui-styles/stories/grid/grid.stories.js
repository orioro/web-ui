import './grid.scss'

export default {
  title: 'Grid',
}

export const Row = () => `<div class="row">
  <div class="col-md-1">
    Lorem ipsum
  </div>
</div>`

export const Heading = () => '<h1>Hey World</h1>';

export const Button = () => {
  const btn = document.createElement('button');
  btn.type = 'button';
  btn.innerText = 'Hello Button';
  btn.addEventListener('click', e => console.log(e));
  return btn;
};
