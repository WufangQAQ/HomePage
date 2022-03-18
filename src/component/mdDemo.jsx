import React from 'react';
import { marked } from 'marked';
// import MathJax from '@nteract/mathjax';
const { Provider, Node } = require('@nteract/mathjax');

// const tex = String.raw(`f(x) = \int_{-\infty}^\infty
//     \hat f(\xi)\,e^{2 \pi i \xi x}
//     \,d\xi`);
const tex = String.raw`\frac{actual}{min(x+y+z)}`;

class MdDemo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 400,
      height: 360,
      devicePixelRatio: window.devicePixelRatio || 1,
    };

    window.vm = this
  }

  componentDidMount() {
    // this.renderMD();
    this.renderCanvasDemo();
  }

  // renderMD = () => {
  //   // const mdHtml = marked.parse('## title');
  //   const mdHtml = marked.parse('test', {
  //     baseUrl: '/assets/md/first-md.md',
  //   });
  //   // document.getElementById('content').innerHTML = mdHtml;
  //   return mdHtml;
  // };

  renderCanvasDemo = () => {
    const self = this;
    const { width, height } = self.state;
    const id = 'canvas-demo1';
    let canvas = document.getElementById(id);
    let ctx = canvas.getContext('2d');
    let me = {
      size: 20,
      x: 20,
      y: 36,
      vx: 20,
      vy: 18,
      draw: function () {
        ctx.font = '20px arial';
        ctx.textAlign = 'start';
        ctx.fillText('我', this.x, this.y); // 文字内容的左下角为文字的起点
      },
    };
    me.draw();

    const draw = (event) => {
      let keyDown = event.key;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      switch (keyDown) {
        case 'ArrowUp':
          // me.y - me.vy < 36 ? (me.y = 36) : (me.y = me.y - me.vy);
          if (me.y - me.vy < 36) {
            me.y = 36;
            drawWall(0, 18, 20, 0, width / me.vx);
          } else {
            me.y = me.y - me.vy;
          }
          break;
        case 'ArrowDown':
          if (me.y - me.vy > 306) {
            me.y = 342;
            drawWall(0, 360, 20, 0, width / me.vx);
          } else {
            me.y = me.y + me.vy;
          }
          break;
        case 'ArrowLeft':
          if (me.x - me.vx < 20) {
            me.x = 20;
            drawWall(0, 18, 0, 18, height / me.vy);
          } else {
            me.x = me.x - me.vx;
          }
          break;
        case 'ArrowRight':
          me.x - me.vx > 320 ? (me.x = 360) : (me.x = me.x + me.vx);
          if (me.x - me.vx > 320) {
            me.x = 360;
            drawWall(380, 18, 0, 18, height / me.vy);
          } else {
            me.x = me.x + me.vx;
          }
          break;
        default:
          console.log(keyDown);
          break;
      }

      me.draw();
    };

    const drawWall = (x, y, vx, vy, len) => {
      ctx.font = '20px arial';
      for (let i = 0; i < len; i++) {
        ctx.fillText('墙', x + vx * i, y + vy * i);
      }
      ctx.fillText('哦对了，这里是一堵墙', 160, 180);
    };

    // 键盘事件只有能聚焦的元素才生效，否则会升级到父元素上面，所以再canvas上添加了tabIndex="0"
    canvas.addEventListener('keydown', (event) => {
      draw(event);
    });
  };

  render() {
    const { width, height, devicePixelRatio } = this.state;
    let sWidth = width / devicePixelRatio;
    let sHeight = height / devicePixelRatio;
    return (
      <div id="content">
        <Provider>
          <p>
            This is an inline math formula: <Node inline>{tex}</Node>
            <span> and a block one:</span>
            <Node>{`a = {x^2 - y^3}/3`}</Node>
          </p>
          <span style={{ fontSize: 16, fontFamily: 'arial' }}>我</span>
        </Provider>
        {/* 当分辨率有进行缩放的时候，在canvas中绘制的内容就会出现精度不够模糊的情况，所以要进行样式上的缩放来调整 */}
        <canvas
          id="canvas-demo1"
          tabIndex="0"
          width={width}
          height={height}
          style={{ width: sWidth, height: sHeight, border: '1px solid #666' }}
        ></canvas>
      </div>
    );
  }
}

export default MdDemo;
