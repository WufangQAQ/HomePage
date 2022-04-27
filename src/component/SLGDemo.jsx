import React from 'react';
import { marked } from 'marked';
// import MathJax from '@nteract/mathjax';
const { Provider, Node } = require('@nteract/mathjax');

// const tex = String.raw(`f(x) = \int_{-\infty}^\infty
//     \hat f(\xi)\,e^{2 \pi i \xi x}
//     \,d\xi`);
const tex = String.raw`\frac{actual}{min(x+y+z)}`;

class SLGDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      height: 400,
      devicePixelRatio: window.devicePixelRatio || 1,
    };

    window.vm = this;
  }

  componentDidMount() {
    // this.renderMD();
    this.renderSLGDemo();
  }

  renderSLGDemo = () => {
    const self = this;
    // const { width, height } = self.state;
    // init canvas
    const id = 'SLG-canvas';
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext('2d');
    const lattice = {
      size: 50,
      x: 0,
      y: 0,
      border: 4,
      vx: 50,
      vy: 50,
      step: 3,
      draw: function () {
        console.log('lattice', this);
        ctx.fillStyle = 'aquamarine';
        ctx.fillRect(this.x + this.border, this.y + this.border, this.size - this.border * 2, this.size - this.border * 2);
      },
      movableRange: function() {
        // 按方向绘制
        ctx.fillStyle = '#ccc';
        for(let i=1 ;i<=this.step; i++) {
          // 上
          let upY = this.y - this.size*i
          ctx.fillRect(this.x + this.border, upY + this.border, this.size - this.border * 2, this.size - this.border * 2);
          // 下
          let downY = this.y + this.size*i
          ctx.fillRect(this.x + this.border, downY + this.border, this.size - this.border * 2, this.size - this.border * 2);
          // 左
          let leftX = this.x - this.size*i
          ctx.fillRect(leftX + this.border, this.y + this.border, this.size - this.border * 2, this.size - this.border * 2);
          // 右
          let rightX = this.x + this.size*i
          ctx.fillRect(rightX + this.border, this.y + this.border, this.size - this.border * 2, this.size - this.border * 2);
        }
      },
      movableRange2: function () {
        // 按圈数绘制
        
      }

    };
    lattice.draw();

    // 绘制方块
    const draw = (event) => {
      const { width, height } = self.state;
      const key = event.key;
      // 清空画布重新绘制
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      switch (key) {
        case 'ArrowUp':
          lattice.y = lattice.y - lattice.vy >= 0 ? lattice.y - lattice.vy : lattice.y;
          lattice.draw();
          break;
        case 'ArrowDown':
          lattice.y = lattice.y + lattice.vy > canvas.height - lattice.size ? lattice.y : lattice.y + lattice.vy;
          lattice.draw();
          break;
        case 'ArrowLeft':
          lattice.x = lattice.x - lattice.vx >= 0 ? lattice.x - lattice.vx : lattice.x;
          lattice.draw();
          break;
        case 'ArrowRight':
          lattice.x = lattice.x + lattice.vx > canvas.width - lattice.size ? lattice.x : lattice.x + lattice.vx;
          lattice.draw();
          break;
        case 'Enter':
          lattice.draw();
          lattice.movableRange();
          break;
        default:
          console.log(key);
          lattice.draw();
          break;
      }
    }

    
    // 键盘事件只有能聚焦的元素才生效，否则会升级到父元素上面，所以再canvas上添加了tabIndex="0"
    canvas.addEventListener('keydown', (event) => {
      draw(event);
    });
  };

  render() {
    const { width, height, devicePixelRatio } = this.state;
    let sWidth = width * devicePixelRatio;
    let sHeight = height * devicePixelRatio;
    return (
      <div id="content">
        <canvas
          id="SLG-canvas"
          width={width}
          height={height}
          tabIndex="0"
          style={{ width: width, height: height, border: '1px solid #666' }}
        ></canvas>
      </div>
    );
  }
}

export default SLGDemo;
