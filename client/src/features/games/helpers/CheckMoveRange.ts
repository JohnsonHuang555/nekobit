type TRange = {
  x: number;
  y: number;
}

export class CheckMoveRange {
  static isInRange(range: TRange[], targetX: number, targetY: number): boolean {
    const canMove = range.find(r => {
      return r.x === targetX && r.y === targetY;
    });
    return canMove ? true : false;
  }

  // 短十字
  static shortCross(currentX: number, currentY: number, canDown: boolean = true): TRange[] {
    const range: TRange[] = [];
    range.push({ x: currentX + 1, y: currentY }); // 右
    range.push({ x: currentX - 1, y: currentY }); // 左
    range.push({ x: currentX, y: currentY + 1 }); // 上
    if (canDown) {
      range.push({ x: currentX, y: currentY - 1 }); // 下
    }
    return range;
  }


}
