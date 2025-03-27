import { createCanvas } from 'canvas';
export function textToBase64Image(text, options = {}) {
    // 设置默认参数
    const { width = 300, fontSize = 24, fontFamily = 'Arial', backgroundColor = 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', textColor = 'black' } = options;
    // 创建临时画布计算文本尺寸
    const tempCanvas = createCanvas(width, 50);
    const tempCtx = tempCanvas.getContext('2d');
    tempCtx.font = `${fontSize}px ${fontFamily}`;
    // 计算文本换行
    const words = text.split(' ');
    const lines = [];
    let currentLine = words[0];
    for (let i = 1; i < words.length; i++) {
        const word = words[i];
        const width = tempCtx.measureText(currentLine + ' ' + word).width;
        if (width < width - 40) {
            currentLine += ' ' + word;
        }
        else {
            lines.push(currentLine);
            currentLine = word;
        }
    }
    lines.push(currentLine);
    // 计算所需高度
    const lineHeight = fontSize * 1.5;
    const height = Math.max(200, lines.length * lineHeight + 80);
    // 创建实际画布
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');
    // 创建渐变背景
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    if (backgroundColor.includes('linear-gradient')) {
        const colors = backgroundColor.match(/#[a-f0-9]{6}/gi) || ['#ff6b6b', '#4ecdc4'];
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
    }
    else {
        gradient.addColorStop(0, backgroundColor);
        gradient.addColorStop(1, backgroundColor);
    }
    // 绘制背景
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    // 添加装饰性花纹
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < width; i += 30) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 20, height);
        ctx.stroke();
    }
    // 设置文字样式
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // 绘制文字
    const startY = height / 2 - (lines.length - 1) * lineHeight / 2;
    lines.forEach((line, index) => {
        ctx.fillText(line, width / 2, startY + index * lineHeight);
    });
    // 转换为 Base64
    return canvas.toDataURL().split(',')[1];
}
// 使用示例
function example() {
    const base64Image = textToBase64Image('Hello, World!', {
        width: 400,
        height: 300,
        fontSize: 36,
        backgroundColor: '#f0f0f0'
    });
    console.log(base64Image);
}
example();
