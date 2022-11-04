export default class {
  constructor(options) {
    const {
      el: element = null,
      size = '30',
      width = '4',
      color = '#333',
    } = options;
    this.el = document.querySelector(element);
    this.el.classList.add('my-loader');
    const styleEl = document.createElement('style');
    styleEl.innerHTML = `.my-loader {
        display:none;
        width: ${size}px;
        height: ${size}px;
        border-width: ${width}px;
        border-style: solid;
        border-color: ${color};
        border-radius: 50%;
        border-top-color: transparent;
        animation: loading-spin .8s linear infinite;
      }
      .my-loader.start {
        display: block;
      }
      @keyframes loading-spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }`;
    document.head.append(styleEl);
  }
  start() {
    this.el.classList.add('start');
  }
  stop() {
    this.el.classList.remove('start');
  }
}