export const drawRect = (detections, ctx) => {
  // Loop through each prediction
  // parameter是x,y,宽,高，probability是概率，arr3是人脸数量
  // const [parameter, probability, numOfFace] = [detections[0], detections[1], detections[2]]
  const [parameter, probability, numOfFace] = [detections[0].dataSync(), detections[1].dataSync(), detections[2].dataSync()]
  // console.log(parameter, probability, numOfFace)
  // const [x, y, width, height] = [parameter[0] * 640, parameter[1] * 480, parameter[2] * 250, parameter[3] * 250];
  // const text = prediction['class'];
  const num = numOfFace.indexOf(-1) //得到总共有多少人脸
  for (var i = 0; i < num; i++) {
    const [x, y, width, height] = [parameter[4 * i] * 640, parameter[4 * i + 1] * 480, parameter[4 * i + 2] * 240, parameter[4 * i + 3] * 250];
    const isMask = numOfFace[i] ? 'mask' + probability[i].toString().slice(0, 4) : 'no-mask' + probability[i].toString().slice(0, 4);

    draw(x, y, width, height, isMask, ctx)
  }
}
function draw(x, y, width, height, text, board) {
  // Set styling
  // const color = Math.floor(Math.random() * 16777215).toString(16);
  board.strokeStyle = 'pink'
  board.font = '20px Arial';
  board.lineWidth = 3
  // Draw rectangles and text
  board.beginPath();
  board.fillStyle = 'pink'
  board.fillText(text, x, y);
  board.rect(x, y, width, height);
  board.stroke();
}