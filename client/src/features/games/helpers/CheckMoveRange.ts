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
  static shortCross(currentX: number, currentY: number): TRange[] {
    const range: TRange[] = [];
    range.push({ x: currentX + 1, y: currentY });
    range.push({ x: currentX - 1, y: currentY });
    range.push({ x: currentX, y: currentY + 1 });
    range.push({ x: currentX, y: currentY - 1 });
    return range;
  }
}
