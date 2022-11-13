// 로딩 아이콘(애니메이션) 생성자 클래스
export default class {
  constructor(options) {
    const { 
			el: element = null, 
		} = options;
    this.el = document.querySelector(element);
    this.el.innerHTML = `
      <svg viewBox="22.857142857142858 22.857142857142858 45.714285714285715 45.714285714285715">
      	<circle cx="45.714285714285715" cy="45.714285714285715" r="20" stroke-width="5.714285714285714" stroke-dasharray="125.664" stroke-dashoffset="125.66370614359172px"></circle>
      </svg>
    `
  }
  start() {
    this.el.classList.add('start');
  }
  stop() {
    this.el.classList.remove('start');
  }
}
