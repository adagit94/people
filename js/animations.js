import {
  BASE_ANIM_DURATION,
  BASE_ANIM_PAUSE,
  TRANSLATE_SQUARES_DURATION,
  SCALE_STRIPES_DURATION,
  SCALE_STRIPES_ITERATIONS,
  SCALE_STRIPES_TOTAL_DURATION,
  SWIPE_STRIPES_DURATION,
  SWIPE_STRIPES_TOTAL_DURATION,
  ANIM_CHAIN_SINGLE_DURATION,
  ROTATE_LINES_DURATION,
  COLS,
} from "./constants.js";

import { LINE_Y_TRANSLATE, WHITE, LINE_HEIGHT, LINE_WIDTH } from "./init.js";
import Animator from "./Animator.js";
import Augen from "./audio/Augen.js";

const grid = document.querySelector("#grid");
const style = document.querySelector("style");
const rows = Array.from(grid.childNodes);

const topCount = Math.ceil(rows.length / 2);
const topRows = rows.slice(0, topCount);
const bottomRows = rows.slice(topCount, rows.length);

let animator = new Animator(rows);
let augen = new Augen();

style.textContent += `
@keyframes translateSquareAdd {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(${window.SQUARE_DIMENSIONS}px);
    }
} 
`;
style.textContent += `
@keyframes translateSquareSubtract {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-${window.SQUARE_DIMENSIONS}px);
    }
} 
`;

style.textContent += `
@keyframes translateSquareLeft {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(-${window.SQUARE_DIMENSIONS / 2}px);
    }
} 
`;
style.textContent += `
@keyframes translateSquareRight {
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(${window.SQUARE_DIMENSIONS / 2}px);
    }
} 
`;

style.textContent += `
@keyframes translateSquareAddLeft {
    from {
      transform: translateX(${window.SQUARE_DIMENSIONS}px);
    }

    to {
      transform: translateX(${window.SQUARE_DIMENSIONS / 2}px);
    }
} 
`;

style.textContent += `
@keyframes translateSquareSubtractLeft {
    from {
      transform: translateX(-${window.SQUARE_DIMENSIONS}px);
    }

    to {
        transform: translateX(-${1.5 * window.SQUARE_DIMENSIONS}px);
    }
} 
`;

style.textContent += `
@keyframes translateSquareAddRight {
    from {
      transform: translateX(${window.SQUARE_DIMENSIONS}px);
    }

    to {
      transform: translateX(${1.5 * window.SQUARE_DIMENSIONS}px);
    }
} 
`;

style.textContent += `
@keyframes translateSquareSubtractRight {
    from {
      transform: translateX(-${window.SQUARE_DIMENSIONS}px);
    }

    to {
        transform: translateX(-${window.SQUARE_DIMENSIONS / 2}px);
    }
} 
`;

style.textContent += `
@keyframes scaleLineInwardFirst {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) ${window.LINE_DIAGONAL_SCALE};
        
    }

    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(0.5);
    }
} 
`;

style.textContent += `
@keyframes scaleLineOutwardFirst {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes scaleLineInwardSecond {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) ${window.LINE_DIAGONAL_SCALE};
        
    }

    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes rotateLineFirst {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(0.5);
    }
    
    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
    }
}
`;

style.textContent += `
@keyframes rotateLineSecond {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(0);
    }
    
    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes scaleSquare {
    from {
        transform: scale(1);
        z-index: 1;
    }
    
    to {
        transform: scale(1.25);
        z-index: 2;
    }
} 
`;

style.textContent += `
@keyframes scaleSquareWithAddTransform {
    from {
        transform: translateX(${window.SQUARE_DIMENSIONS}px) scale(1);
        z-index: 1;
    }
    
    to {
        transform: translateX(${window.SQUARE_DIMENSIONS}px) scale(1.25);
        z-index: 2;
    }
} 
`;

style.textContent += `
@keyframes scaleSquareWithSubtractTransform {
    from {
        transform: translateX(-${window.SQUARE_DIMENSIONS}px) scale(1);
        z-index: 1;
    }
    
    to {
        transform: translateX(-${window.SQUARE_DIMENSIONS}px) scale(1.25);
        z-index: 2;
    }
} 
`;

style.textContent += `
@keyframes translateFirstTopBorderLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${
  window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(90deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes translateFirstMiddleTopLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${window.SQUARE_DIMENSIONS}px) rotateZ(90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes translateFirstMiddleBottomLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, -${window.SQUARE_DIMENSIONS / 2}px) rotateZ(90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes scaleFirstMiddleLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes translateFirstBottomBorderLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${-window.SQUARE_DIMENSIONS / 2}px) rotateZ(90deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes scaleAndTranslateSecondRightBorderLine {
    from {
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
        width: 0px;
    }
    
    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
        width: ${window.SQUARE_DIMENSIONS / 2}px;
    }
} 
`;

style.textContent += `
@keyframes scaleAndTranslateSecondLeftBorderLine {
    from {
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
        width: 0px;
    }
    
    to {
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
        width: ${window.SQUARE_DIMENSIONS / 2}px;
    }
} 
`;

style.textContent += `
@keyframes rotateInnerLineLeft {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes rotateInnerLineRight {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(180deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes scalePointToZero {
    from {
        transform: unset;
        
    }

    to {
        transform: scale(0);
    }
} 
`;

style.textContent += `
@keyframes scaleMiddleLeftLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(0);
    }

    to {
          transform: translate(${
            -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
          }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) 
            scaleX(${2 * window.LINE_DIAGONAL_SCALE_NUM});
    }
} 
`;

style.textContent += `
@keyframes scaleMiddleRightLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(0);
        
    }

    to {
          transform: translate(${
            -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
          }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(${
  2 * window.LINE_DIAGONAL_SCALE_NUM
});
    }
} 
`;

style.textContent += `
@keyframes scaleTopLeftSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-27deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-27deg) scaleX(2.3);
    }
} 
`;

style.textContent += `
@keyframes scaleTopLeftLastStepSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleTopRightSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(207deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(207deg) scaleX(2.3);
    }
} 
`;

style.textContent += `
@keyframes scaleTopRightLastStepSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(225deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(225deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleBottomLeftSideLine {
  from {
    transform-origin: left;
    transform: translate(${
      window.POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(27deg) scaleX(0);
}

to {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(27deg) scaleX(2.3);
}
} 
`;

style.textContent += `
@keyframes scaleBottomLeftLastStepSideLine {
  from {
    transform-origin: left;
    transform: translate(${
      window.POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(0);
}

to {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) ${window.LINE_DIAGONAL_SCALE};
}
} 
`;

style.textContent += `
@keyframes scaleBottomRightSideLine {
from {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(-207deg) scaleX(0);
}

to {
transform-origin: left;
transform: translate(${
  window.POINT_DIMENSIONS / 2
}px, ${LINE_Y_TRANSLATE}) rotateZ(-207deg) scaleX(2.3);
}
} 
`;

style.textContent += `
@keyframes scaleBottomRightLastStepSideLine {
from {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) scaleX(0);
}

to {
transform-origin: left;
transform: translate(${
  window.POINT_DIMENSIONS / 2
}px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) ${window.LINE_DIAGONAL_SCALE};
}
} 
`;

style.textContent += `
@keyframes scaleTopLeftCornerLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleTopRightCornerLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleBottomLeftCornerLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleBottomRightCornerLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-135deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-135deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes scaleLeftStraightSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) scaleX(2);
    }
} 
`;

style.textContent += `
@keyframes scaleRightStraightSideLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(180deg) scaleX(0);
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(180deg) scaleX(2);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateTopLeftFirstLine {
    from {
      transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
    }

    to {
      transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(0.5);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateBottomLeftFirstLine {
    from {
      transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
    }

    to {
      transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(0.5);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateTopLeftSecondLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
        width: ${LINE_WIDTH}px;
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
      width: ${LINE_WIDTH}px;
  }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateBottomLeftSecondLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
        width: ${LINE_WIDTH}px;
    }

    to {
      transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
      width: ${LINE_WIDTH}px;
  }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateTopRightFirstLine {
  from {
    transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
  }

  to {
    transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-180deg) scaleX(0.5);
  }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateBottomRightFirstLine {
  from {
    transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
  }

  to {
    transform-origin: left;
      transform: translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(180deg) scaleX(0.5);
  }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateTopRightSecondLine {
  from {
    transform-origin: left;
    transform: translate(${
      window.POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
    width: ${LINE_WIDTH}px;
}

to {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
  width: ${LINE_WIDTH}px;
}
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateBottomRightSecondLine {
  from {
    transform-origin: left;
    transform: translate(${
      window.POINT_DIMENSIONS / 2
    }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
    width: ${LINE_WIDTH}px;
}

to {
  transform-origin: left;
  transform: translate(${
    window.POINT_DIMENSIONS / 2
  }px, ${LINE_Y_TRANSLATE}) rotateZ(-135deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
  width: ${LINE_WIDTH}px;
}
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstLeftLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstRightLine {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) ${window.LINE_DIAGONAL_SCALE};
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstLineRight {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(180deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstLineLeft {
    from {
        transform: translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
        transform:  translate(${
          -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(0deg) scaleX(1.05);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstLeftMiddleLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-135deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateSecondLeftMiddleLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(135deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateFirstRightMiddleLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(-90deg) scaleX(0.5);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(-45deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainRotateSecondRightMiddleLine {
    from {
        transform-origin: left;
        transform: translate(${
          window.POINT_DIMENSIONS / 2
        }px, ${LINE_Y_TRANSLATE}) rotateZ(90deg) scaleX(0.5);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${
        window.POINT_DIMENSIONS / 2
      }px, ${LINE_Y_TRANSLATE}) rotateZ(45deg) scaleX(${
  window.LINE_DIAGONAL_SCALE_NUM / 2
});
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainScaleLineToZeroTop {
    from {
        transform-origin: left;
        transform: translate(${window.POINT_DIMENSIONS / 2}px, ${
  -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(90deg) scaleX(1.05);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${window.POINT_DIMENSIONS / 2}px, ${
  -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainScaleLineToZeroBottom {
    from {
        transform-origin: left;
        transform: translate(${window.POINT_DIMENSIONS / 2}px, ${
  window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(-90deg) scaleX(1.05);
        
    }

    to {
      transform-origin: left;
      transform:  translate(${window.POINT_DIMENSIONS / 2}px, ${
  window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(-90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainScaleLineToZeroTopMiddle {
    from {
        transform-origin: left;
        transform: translate(${window.POINT_DIMENSIONS / 2}px, ${
  -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(90deg) scaleX(0.5);
    }

    to {
      transform-origin: left;
      transform:  translate(${window.POINT_DIMENSIONS / 2}px, ${
  -window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes whiteAnimChainScaleLineToZeroBottomMiddle {
    from {
        transform-origin: left;
        transform: translate(${window.POINT_DIMENSIONS / 2}px, ${
  window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(-90deg) scaleX(0.5);
    }

    to {
      transform-origin: left;
      transform:  translate(${window.POINT_DIMENSIONS / 2}px, ${
  window.SQUARE_DIMENSIONS / 2 + window.POINT_DIMENSIONS / 2
}px) rotateZ(-90deg) scaleX(0);
    }
} 
`;

style.textContent += `
@keyframes scaleMiddleUnitySquare {
    from {
        width: 0;
        height: 0;
    }

    to {
      width: ${window.SQUARE_DIMENSIONS}px;
      height: ${window.SQUARE_DIMENSIONS}px;
    }
} 
`;

style.textContent += `
 .square-z-index-temp-increase-2 {
   z-index: 2 !important;
 }
`;

style.textContent += `
 .square-z-index-temp-increase-3 {
   z-index: 3 !important;
 }
`;

function translateSquares() {
  let delayMult = 0;
  let animTime;

  for (let y = 0; y < topRows.length; y += 2) {
    const squares = topRows[y].childNodes;

    for (let x = 0; x < squares.length; x += 2, delayMult++) {
      const evenSquare = squares[x];
      const oddSquare = squares[x + 1];

      setSquareTranslation(evenSquare, true, delayMult);
      setSquareTranslation(oddSquare, false, delayMult);

      // augen.triggerAnimSound((audioContext, audioSources) => {
      //   const source = audioSources.squareTranslation;

      //   const plannedStart = delayMult * TRANSLATE_SQUARES_DURATION;

      //   window.setTimeout(() => {
      //     const duration =
      //       audioContext.currentTime + TRANSLATE_SQUARES_DURATION / 1000;

      //     if (y === 0 && x === 0) {
      //       source.osc.start();
      //     } else if (y === topRows.length - 1 && x === squares.length - 2) {
      //       source.osc.stop(duration);
      //     }

      //     source.osc.frequency.exponentialRampToValueAtTime(
      //       source.osc.frequency.value < 195 ? 200 : 190,
      //       duration
      //     );
      //   }, plannedStart);
      // });
    }
  }

  animTime = delayMult * TRANSLATE_SQUARES_DURATION;
  delayMult = 0;

  for (let y = bottomRows.length - 1; y >= 0; y -= 2) {
    const squares = bottomRows[y].childNodes;

    for (let x = squares.length - 1; x >= 0; x -= 2, delayMult++) {
      const square = squares[x];
      const prevSquare = squares[x - 1];

      setSquareTranslation(square, false, delayMult);
      setSquareTranslation(prevSquare, true, delayMult);
    }
  }

  setTimeout(rotateLines, BASE_ANIM_PAUSE + animTime);
}

function setSquareTranslation(square, add, delayMult) {
  square.style.animationDuration = `${TRANSLATE_SQUARES_DURATION}ms`;
  square.style.animationDelay = `${delayMult * TRANSLATE_SQUARES_DURATION}ms`;
  square.style.animationTimingFunction = "ease-in-out";
  square.style.animationFillMode = "forwards";
  square.style.animationName = add
    ? "translateSquareAdd"
    : "translateSquareSubtract";
  square.style.animationDirection = "normal";
  square.style.animationIterationCount = "1";
}

function rotateLines() {
  // augen.triggerAnimSound((audioContext, audioSources) => {
  //   const source = audioSources.rotateLines;

  //   source.osc.start();

  //   source.osc.frequency.linearRampToValueAtTime(
  //     100,
  //     audioContext.currentTime + ROTATE_LINES_DURATION / 1000
  //   );

  //   window.setTimeout(() => {
  //     source.osc.frequency.linearRampToValueAtTime(
  //       200,
  //       audioContext.currentTime + ROTATE_LINES_DURATION / 1000
  //     );

  //     window.setTimeout(() => {
  //       const endTime = audioContext.currentTime + ROTATE_LINES_DURATION / 1000;

  //       source.osc.frequency.linearRampToValueAtTime(400, endTime);
  //       source.osc.stop(endTime);
  //     }, ROTATE_LINES_DURATION);
  //   }, ROTATE_LINES_DURATION);
  // });

  for (const row of rows) {
    const squares = row.childNodes;

    for (const square of squares) {
      const point = square.childNodes[0];
      const lines = point.childNodes;

      for (let l = 0; l < lines.length; l++) {
        const order = l === 0 ? "First" : "Second";

        lines[l].style.animationDuration = `500ms, 500ms${
          order === "First" ? ", 500ms" : ""
        }`;

        lines[l].style.animationDelay = `0ms, 500ms${
          order === "First" ? ", 1000ms" : ""
        }`;

        lines[l].style.animationFillMode = `forwards, forwards${
          order === "First" ? ", forwards" : ""
        }`;

        lines[l].style.animationTimingFunction = `linear, linear${
          order === "First" ? ", linear" : ""
        }`;

        lines[
          l
        ].style.animationName = `scaleLineInward${order}, rotateLine${order}${
          order === "First" ? ", scaleLineOutwardFirst" : ""
        }`;
      }
    }
  }

  setTimeout(scaleStripes, 1500);
}

function scaleStripes() {
  for (let y = 0; y < rows.length; y++) {
    const isEvenRow = y % 2 === 0;
    const squares = rows[y].childNodes;

    for (let x = 0; x < squares.length; x++) {
      const isEvenSquare = x % 2 === 0;
      const square = squares[x];
      const isBlack =
        (isEvenRow && isEvenSquare) || (!isEvenRow && !isEvenSquare);

      square.style.zIndex = isBlack ? 1 : 0;

      if (isEvenRow) {
        square.style.animationDuration += `, ${SCALE_STRIPES_DURATION}ms`;
        square.style.animationDirection += ", alternate";
        square.style.animationTimingFunction += ", linear";
        square.style.animationIterationCount += `, ${SCALE_STRIPES_ITERATIONS}`;
        square.style.animationDelay += isBlack
          ? ", 0ms"
          : `, ${SCALE_STRIPES_DURATION}ms`;
        square.style.animationName += `, scaleSquare${
          isEvenSquare ? "WithAddTransform" : "WithSubtractTransform"
        }`;
        square.style.animationFillMode += ", forwards";
      } else {
        square.style.animationDuration = `${SCALE_STRIPES_DURATION}ms`;
        square.style.animationDirection = "alternate";
        square.style.animationTimingFunction = "linear";
        square.style.animationIterationCount = `${SCALE_STRIPES_ITERATIONS}`;
        square.style.animationDelay = isBlack
          ? "0ms"
          : `${SCALE_STRIPES_DURATION}ms`;
        square.style.animationName = "scaleSquare";
        square.style.animationFillMode = "forwards";
      }
    }
  }

  setTimeout(swapStripes, SCALE_STRIPES_TOTAL_DURATION);
}

function swapStripes() {
  let lineGrowthDelay = 2 * ANIM_CHAIN_SINGLE_DURATION * (topCount - 3);
  let bottomHalfSquareIndex = rows.length;
  let whiteSquareLeftBottomtSideIndex = 0;
  let whiteSquareRightSideIndices = {
    even: 1,
    odd: 4,
  };

  for (let rowI = 0; rowI < rows.length; rowI++) {
    const row = rows[rowI];
    const inTopHalf = rowI < Math.ceil(rows.length / 2);
    const isEvenRow = rowI % 2 === 0;
    const isFirstRow = rowI === 0;
    const isSecondRow = rowI === 1;
    const isLastRow = rowI === rows.length - 1;
    const isNextToLastRow = rowI === rows.length - 2;
    const isMiddleRow = rowI === Math.ceil(rows.length / 2) - 1;
    const squares = Array.from(row.childNodes);
    const leftSquares = squares.slice(0, COLS / 2);
    const rightSquares = squares.slice(COLS / 2, squares.length);

    const indexOffset = isEvenRow ? 1 : 0;
    let blackSquareOrder = leftSquares.length / 2 - 1;
    let whiteSquareOrder = 0;
    let sideLineScaleDivider = leftSquares.length / 2;
    let whiteSquareIndexToAnim;
    let diagonalOffset = {
      topLeft: rowI,
      topRight: 3,
      bottomLeft: 0,
      bottomRight: 0,
    };

    if (!isMiddleRow) {
      if (inTopHalf) {
        whiteSquareIndexToAnim = rowI * 2 + indexOffset;
      } else {
        whiteSquareIndexToAnim =
          topCount + 1 - whiteSquareLeftBottomtSideIndex * 2 + indexOffset;

        ++whiteSquareLeftBottomtSideIndex;
      }
    }

    leftSquares.forEach((square, squareI, squares) => {
      const isEvenSquare = squareI % 2 === 0;
      const isBlack =
        (isEvenRow && isEvenSquare) || (!isEvenRow && !isEvenSquare);

      if (isBlack) {
        for (
          let animI = 1;
          animI <= squares.length / 2 - blackSquareOrder;
          animI++
        ) {
          const animName = `leftB${rowI}${squareI}${animI}`;
          const transformSubtractionPX = animI * window.SQUARE_DIMENSIONS;

          style.textContent += `
            @keyframes ${animName} {
                from {
                    left: -${
                      transformSubtractionPX - window.SQUARE_DIMENSIONS
                    }px;
                }
                
                to {
                    left: -${transformSubtractionPX}px;
                }
            } 
            `;

          square.style.animationDuration += `, ${SWIPE_STRIPES_DURATION}ms`;
          square.style.animationDirection += ", normal";
          square.style.animationDelay += `, ${
            SWIPE_STRIPES_DURATION * (blackSquareOrder + animI - 1)
          }ms`;
          square.style.animationTimingFunction += ", ease-in-out";
          square.style.animationIterationCount += ", 1";
          square.style.animationFillMode += ", forwards";
          square.style.animationName += `, ${animName}`;
        }

        blackSquareOrder--;
      } else {
        const animName = `leftW${rowI}${squareI}`;
        const transformAdditionPX =
          (squares.length / 2 - whiteSquareOrder) * window.SQUARE_DIMENSIONS;

        style.textContent += `
            @keyframes ${animName} {
                from {
                    left: 0;
                    z-index: 0;
                }
                
                to {
                    left: ${transformAdditionPX}px;
                    z-index: 0;
                }
            } 
            `;

        square.style.animationDuration += `, ${SWIPE_STRIPES_DURATION}ms`;
        square.style.animationDirection += ", normal";
        square.style.animationDelay += `, ${
          SWIPE_STRIPES_DURATION * (squares.length / 2 - whiteSquareOrder - 1)
        }ms`;
        square.style.animationTimingFunction += ", ease-in-out";
        square.style.animationIterationCount += ", 1";
        square.style.animationFillMode += ", forwards";
        square.style.animationName += `, ${animName}`;

        whiteSquareOrder++;
        if (squareI < leftSquares.length - 2) sideLineScaleDivider--;
      }

      setTimeout(
        setAnimChain,
        SWIPE_STRIPES_TOTAL_DURATION,
        square,
        squareI,
        isFirstRow,
        isSecondRow,
        isLastRow,
        isNextToLastRow,
        isEvenRow,
        isMiddleRow,
        inTopHalf,
        true,
        lineGrowthDelay,
        rowI,
        rows.length,
        bottomHalfSquareIndex,
        isBlack,
        whiteSquareIndexToAnim,
        sideLineScaleDivider,
        diagonalOffset
      );
    });

    blackSquareOrder = 0;
    whiteSquareOrder = 0;

    if (!isMiddleRow) {
      whiteSquareIndexToAnim =
        squares.length / 2 -
        whiteSquareRightSideIndices[isEvenRow ? "even" : "odd"];

      if (rowI < topCount - 3) {
        whiteSquareRightSideIndices[isEvenRow ? "even" : "odd"] += 4;
      } else if (rowI > topCount - 1) {
        whiteSquareRightSideIndices[isEvenRow ? "even" : "odd"] -= 4;
      }
    }

    rightSquares.forEach((square, squareI, squares) => {
      const isEvenSquare = squareI % 2 === 0;
      const isBlack =
        (isEvenRow && isEvenSquare) || (!isEvenRow && !isEvenSquare);

      if (isBlack) {
        for (
          let animI = 0;
          animI < squares.length / 2 - blackSquareOrder;
          animI++
        ) {
          const animName = `rightB${rowI}${squareI}${animI}`;
          const transformPX = animI * window.SQUARE_DIMENSIONS;

          style.textContent += `
            @keyframes ${animName} {
                from {
                    left: ${
                      transformPX === 0
                        ? 0
                        : transformPX - window.SQUARE_DIMENSIONS
                    }
                    px;
                }
                
                to {
                    left: ${transformPX}px;
                }
            } 
            `;

          square.style.animationDuration += `, ${SWIPE_STRIPES_DURATION}ms`;
          square.style.animationDirection += ", normal";
          square.style.animationDelay += `, ${
            SWIPE_STRIPES_DURATION * (blackSquareOrder + animI - 1)
          }ms`;
          square.style.animationTimingFunction += ", ease-in-out";
          square.style.animationIterationCount += ", 1";
          square.style.animationFillMode += ", forwards";
          square.style.animationName += `, ${animName}`;
        }

        blackSquareOrder++;
      } else {
        const animName = `rightW${rowI}${squareI}`;
        const transformPX = whiteSquareOrder * window.SQUARE_DIMENSIONS;

        style.textContent += `
            @keyframes ${animName} {
                from {
                    left: 0;
                    z-index: 0;
                }
                
                to {
                    left: -${transformPX}px;
                    z-index: 0;
                }
            } 
            `;

        square.style.animationDuration += `, ${SWIPE_STRIPES_DURATION}ms`;
        square.style.animationDirection += ", normal";
        square.style.animationDelay += `, ${
          SWIPE_STRIPES_DURATION * (whiteSquareOrder - 1)
        }ms`;
        square.style.animationTimingFunction += ", ease-in-out";
        square.style.animationIterationCount += ", 1";
        square.style.animationFillMode += ", forwards";
        square.style.animationName += `, ${animName}`;

        whiteSquareOrder++;
        if (squareI > 3) sideLineScaleDivider++;
      }

      setTimeout(
        setAnimChain,
        SWIPE_STRIPES_TOTAL_DURATION,
        square,
        squareI,
        isFirstRow,
        isSecondRow,
        isLastRow,
        isNextToLastRow,
        isEvenRow,
        isMiddleRow,
        inTopHalf,
        false,
        lineGrowthDelay,
        rowI,
        rows.length,
        bottomHalfSquareIndex,
        isBlack,
        whiteSquareIndexToAnim,
        sideLineScaleDivider,
        diagonalOffset
      );
    });

    if (
      !isFirstRow &&
      !isSecondRow &&
      !isLastRow &&
      !isNextToLastRow &&
      !isMiddleRow
    ) {
      if (inTopHalf) {
        lineGrowthDelay -= ANIM_CHAIN_SINGLE_DURATION;
      } else {
        lineGrowthDelay += ANIM_CHAIN_SINGLE_DURATION;
        bottomHalfSquareIndex -= 2;
      }
    } else if (isMiddleRow) {
      lineGrowthDelay = 3 * ANIM_CHAIN_SINGLE_DURATION;
    }
  }
}

function setAnimChain(
  square,
  squareIndex,
  isFirstRow,
  isSecondRow,
  isLastRow,
  isNextToLastRow,
  isEvenRow,
  inMiddleRow,
  inTopHalf,
  inLeftSide,
  lineGrowthDelay,
  rowI,
  rowsLength,
  bottomHalfSquareIndex,
  isBlack,
  whiteSquareIndexToAnim,
  sideLineScaleDivider,
  diagonalOffset
) {
  const points = square.childNodes;
  const point = points[0];
  const emptyAnimPoint = points[1];
  const lines = point.childNodes;
  const line1 = lines[0];
  const line2 = lines[1];

  if (isBlack) {
    if (
      ((isEvenRow && squareIndex === 4) || (!isEvenRow && squareIndex === 5)) &&
      inMiddleRow
    ) {
      const zIndex = rowsLength + 1;
      const zIndexClass = `square-z-index-temp-increase-${zIndex}`;

      style.textContent += `
    .${zIndexClass} {
      z-index: ${zIndex} !important;
    }
    `;

      square.classList.add(zIndexClass);

      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION / 2,
        ANIM_CHAIN_SINGLE_DURATION / 2,
        "forwards",
        "linear",
        `scaleFirstMiddleLine`
      );

      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION,
        2 * ANIM_CHAIN_SINGLE_DURATION,
        "forwards",
        "ease-out",
        `scaleMiddleLeftLine`
      );

      setAnim(
        line2,
        ANIM_CHAIN_SINGLE_DURATION,
        2 * ANIM_CHAIN_SINGLE_DURATION,
        "forwards",
        "ease-out",
        `scaleMiddleRightLine`
      );
    }

    if (
      ((isEvenRow && squareIndex === 4) || (!isEvenRow && squareIndex === 5)) &&
      !isFirstRow &&
      !isSecondRow &&
      !isNextToLastRow &&
      !isLastRow &&
      !inMiddleRow
    ) {
      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION / 2,
        0,
        "forwards",
        "linear",
        `translateFirstMiddle${inTopHalf ? "Top" : "Bottom"}Line`
      );
    }

    if (
      ((isFirstRow || isLastRow) && (squareIndex === 0 || squareIndex === 8)) ||
      ((isSecondRow || isNextToLastRow) &&
        (squareIndex === 3 || squareIndex === 7))
    ) {
      setAnim(
        line2,
        ANIM_CHAIN_SINGLE_DURATION,
        0,
        "forwards",
        "linear",
        `scaleAndTranslateSecond${
          squareIndex === 0 || squareIndex === 3 ? "Left" : "Right"
        }BorderLine`
      );
    }

    if (
      (isFirstRow && (squareIndex === 0 || squareIndex === 8)) ||
      (isSecondRow && (squareIndex === 3 || squareIndex === 7))
    ) {
      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION,
        0,
        "forwards",
        "linear",
        "translateFirstTopBorderLine"
      );
    }

    if (
      (isLastRow && (squareIndex === 0 || squareIndex === 8)) ||
      (isNextToLastRow && (squareIndex === 3 || squareIndex === 7))
    ) {
      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION,
        0,
        "forwards",
        "linear",
        "translateFirstBottomBorderLine"
      );
    }

    if (
      ((isFirstRow || isLastRow) && squareIndex !== 0 && squareIndex !== 8) ||
      ((isSecondRow || isNextToLastRow) && squareIndex === 5)
    ) {
      setAnim(
        line1,
        ANIM_CHAIN_SINGLE_DURATION,
        0,
        "forwards",
        "ease-in",
        `rotateInnerLine${inLeftSide ? "Left" : "Right"}`
      );
    }

    if (
      (!isFirstRow &&
        !isLastRow &&
        ((isEvenRow && (squareIndex === 0 || squareIndex === 8)) ||
          (!isEvenRow && (squareIndex === 1 || squareIndex === 9)))) ||
      ((isFirstRow || isLastRow) && squareIndex !== 0 && squareIndex !== 8) ||
      (inMiddleRow && (squareIndex === 2 || squareIndex === 6)) ||
      (!isFirstRow &&
        !isSecondRow &&
        !isNextToLastRow &&
        !isLastRow &&
        !inMiddleRow &&
        ((isEvenRow && squareIndex === 4) || (!isEvenRow && squareIndex === 5)))
    ) {
      setAnim(
        emptyAnimPoint,
        ANIM_CHAIN_SINGLE_DURATION,
        ANIM_CHAIN_SINGLE_DURATION,
        "forwards",
        "ease-in",
        `scalePointToZero`
      );
    }

    if (
      !isFirstRow &&
      !isSecondRow &&
      !isLastRow &&
      !isNextToLastRow &&
      !inMiddleRow &&
      ((isEvenRow && (squareIndex === 2 || squareIndex === 6)) ||
        (!isEvenRow && (squareIndex === 3 || squareIndex === 7)))
    ) {
      const leftSide = squareIndex === 2 || squareIndex === 3;

      let name = `scale${inTopHalf ? "Top" : "Bottom"}${
        leftSide ? "Left" : "Right"
      }`;

      let zIndexClass;

      if (rowI === 2 || rowI === rowsLength - 3) {
        name += "LastStep";
      }

      name += "SideLine";

      if (!inTopHalf) {
        const squareZIndex = leftSide
          ? bottomHalfSquareIndex
          : bottomHalfSquareIndex - 1;

        zIndexClass = `square-z-index-temp-increase-${squareZIndex}`;

        style.textContent += `
      .${zIndexClass} {
        z-index: ${squareZIndex} !important;
      }
      `;
      } else {
        zIndexClass = "square-z-index-temp-increase-2";
      }

      square.classList.add(zIndexClass);

      setAnim(
        line2,
        ANIM_CHAIN_SINGLE_DURATION,
        lineGrowthDelay,
        "forwards",
        "ease-out",
        name
      );

      if (
        (inTopHalf &&
          ((isEvenRow && squareIndex === 6) ||
            (!isEvenRow && squareIndex === 7))) ||
        (!inTopHalf &&
          ((isEvenRow && squareIndex === 2) ||
            (!isEvenRow && squareIndex === 3)))
      ) {
        const thirdLine = generateNewLine(WHITE);

        setAnim(
          thirdLine,
          ANIM_CHAIN_SINGLE_DURATION,
          2 * ANIM_CHAIN_SINGLE_DURATION * (topCount - 1),
          "forwards",
          "ease-out",
          `scale${inTopHalf ? "Right" : "Left"}StraightSideLine`
        );

        point.appendChild(thirdLine);
      }
    }

    if ((isFirstRow || isLastRow) && (squareIndex === 0 || squareIndex === 8)) {
      const thirdLine = generateNewLine(WHITE);

      square.classList.add("square-z-index-temp-increase-2");

      setAnim(
        thirdLine,
        ANIM_CHAIN_SINGLE_DURATION,
        2 * ANIM_CHAIN_SINGLE_DURATION * (topCount - 2),
        "forwards",
        "ease-out",
        `scale${isFirstRow ? "Top" : "Bottom"}${
          squareIndex === 0 ? "Left" : "Right"
        }CornerLine`
      );

      point.appendChild(thirdLine);
    }
  } else {
    if (inMiddleRow) {
      if (inLeftSide && squareIndex === 9) {
        setAnim(
          line1,
          ANIM_CHAIN_SINGLE_DURATION,
          0,
          "forwards",
          "linear",
          "whiteAnimChainRotateFirstLeftMiddleLine"
        );

        setAnim(
          line2,
          ANIM_CHAIN_SINGLE_DURATION,
          0,
          "forwards",
          "linear",
          "whiteAnimChainRotateSecondLeftMiddleLine"
        );
      }

      if (!inLeftSide && squareIndex === 1) {
        setAnim(
          line1,
          ANIM_CHAIN_SINGLE_DURATION,
          0,
          "forwards",
          "linear",
          "whiteAnimChainRotateFirstRightMiddleLine"
        );

        setAnim(
          line2,
          ANIM_CHAIN_SINGLE_DURATION,
          0,
          "forwards",
          "linear",
          "whiteAnimChainRotateSecondRightMiddleLine"
        );
      }
    } else if (
      isFirstRow ||
      isLastRow ||
      whiteSquareIndexToAnim === squareIndex
    ) {
      if (inLeftSide) {
        if (
          (isFirstRow || isLastRow) &&
          whiteSquareIndexToAnim !== squareIndex
        ) {
          square.classList.add("square-z-index-temp-increase-2");

          setAnim(
            line1,
            ANIM_CHAIN_SINGLE_DURATION,
            0,
            "forwards",
            "linear",
            "whiteAnimChainRotateFirstLineLeft"
          );
        } else {
          if (squareIndex === 1) {
            square.classList.add("square-z-index-temp-increase-3");

            setAnim(
              line1,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotate${inTopHalf ? "Top" : "Bottom"}LeftFirstLine`
            );

            setAnim(
              line2,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotate${
                inTopHalf ? "Top" : "Bottom"
              }LeftSecondLine`
            );
          } else {
            square.classList.add("square-z-index-temp-increase-2");

            setAnim(
              line1,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotateFirst${inTopHalf ? "Left" : "Right"}Line`
            );
          }
        }
      } else {
        if (
          (isFirstRow || isLastRow) &&
          whiteSquareIndexToAnim !== squareIndex
        ) {
          square.classList.add("square-z-index-temp-increase-2");

          setAnim(
            line1,
            ANIM_CHAIN_SINGLE_DURATION,
            0,
            "forwards",
            "linear",
            "whiteAnimChainRotateFirstLineRight"
          );
        } else {
          if (squareIndex === 9) {
            square.classList.add("square-z-index-temp-increase-3");

            setAnim(
              line1,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotate${
                inTopHalf ? "Top" : "Bottom"
              }RightFirstLine`
            );

            setAnim(
              line2,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotate${
                inTopHalf ? "Top" : "Bottom"
              }RightSecondLine`
            );
          } else {
            square.classList.add("square-z-index-temp-increase-2");

            setAnim(
              line1,
              ANIM_CHAIN_SINGLE_DURATION,
              0,
              "forwards",
              "linear",
              `whiteAnimChainRotateFirst${inTopHalf ? "Right" : "Left"}Line`
            );
          }
        }
      }
    }

    if (!isFirstRow && !isLastRow) {
      const duration = ANIM_CHAIN_SINGLE_DURATION / sideLineScaleDivider;

      if (inTopHalf) {
        const delay = topCount - 1 - rowI;

        const leftSideCond =
          inLeftSide &&
          ((!inMiddleRow && squareIndex < whiteSquareIndexToAnim) ||
            (inMiddleRow && squareIndex !== 9));

        const rightSideCond =
          !inLeftSide &&
          ((!inMiddleRow && squareIndex > whiteSquareIndexToAnim) ||
            (inMiddleRow && squareIndex !== 1));

        if (leftSideCond || rightSideCond) {
          if (inMiddleRow) {
            setAnim(
              line1,
              duration,
              duration * delay,
              "forwards",
              "linear",
              `whiteAnimChainScaleLineToZeroTopMiddle`
            );

            setAnim(
              line2,
              duration,
              duration * delay,
              "forwards",
              "linear",
              `whiteAnimChainScaleLineToZeroBottomMiddle`
            );
          } else {
            setAnim(
              line1,
              duration,
              duration * delay,
              "forwards",
              "linear",
              `whiteAnimChainScaleLineToZeroTop`
            );
          }

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        }

        const topLeftSideCond =
          inLeftSide && squareIndex > whiteSquareIndexToAnim && !inMiddleRow;

        const topRightSideCond =
          !inLeftSide && squareIndex < whiteSquareIndexToAnim && !inMiddleRow;

        if (topLeftSideCond) {
          const duration = ANIM_CHAIN_SINGLE_DURATION / diagonalOffset.topLeft;

          const delay = diagonalOffset.topLeft - rowI;

          diagonalOffset.topLeft++;

          setAnim(
            line1,
            duration,
            duration * delay,
            "forwards",
            "linear",
            `whiteAnimChainScaleLineToZeroTop`
          );

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        } else if (topRightSideCond) {
          const duration = ANIM_CHAIN_SINGLE_DURATION / diagonalOffset.topRight;

          const delay = diagonalOffset.topRight - rowI;

          diagonalOffset.topRight--;

          setAnim(
            line1,
            duration,
            duration * delay,
            "forwards",
            "linear",
            `whiteAnimChainScaleLineToZeroTop`
          );

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        }
      } else {
        const delay = rowI - bottomRows.length;

        const leftSideCond = inLeftSide && squareIndex < whiteSquareIndexToAnim;

        const rightSideCond =
          !inLeftSide && squareIndex > whiteSquareIndexToAnim;

        if (leftSideCond || rightSideCond) {
          setAnim(
            line1,
            duration,
            duration * delay,
            "forwards",
            "linear",
            `whiteAnimChainScaleLineToZeroBottom`
          );

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        }

        const bottomLeftSideCond =
          inLeftSide && squareIndex > whiteSquareIndexToAnim;

        const bottomRightSideCond =
          !inLeftSide && squareIndex < whiteSquareIndexToAnim;

        if (bottomLeftSideCond) {
          const duration =
            ANIM_CHAIN_SINGLE_DURATION /
            (3 - (rowI - topCount) + diagonalOffset.bottomLeft);

          const delay = diagonalOffset.bottomLeft;

          diagonalOffset.bottomLeft++;

          setAnim(
            line1,
            duration,
            duration * delay,
            "forwards",
            "linear",
            `whiteAnimChainScaleLineToZeroBottom`
          );

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        } else if (bottomRightSideCond) {
          const duration =
            ANIM_CHAIN_SINGLE_DURATION / (3 - diagonalOffset.bottomRight);

          const delay = rowI - topCount - diagonalOffset.bottomRight;

          diagonalOffset.bottomRight++;

          setAnim(
            line1,
            duration,
            duration * delay,
            "forwards",
            "linear",
            `whiteAnimChainScaleLineToZeroBottom`
          );

          setAnim(
            emptyAnimPoint,
            ANIM_CHAIN_SINGLE_DURATION,
            ANIM_CHAIN_SINGLE_DURATION,
            "forwards",
            "ease-in",
            `scalePointToZero`
          );
        }
      }
    }
  }
}

function setAnim(entity, duration, delay, fillMode, timingFunc, name) {
  if (entity.style.animationDuration.length) {
    entity.style.animationDuration += `, ${duration}ms`;
  } else {
    entity.style.animationDuration = `${duration}ms`;
  }

  if (entity.style.animationDelay.length) {
    entity.style.animationDelay += `, ${delay}ms`;
  } else {
    entity.style.animationDelay = `${delay}ms`;
  }

  if (entity.style.animationFillMode.length) {
    entity.style.animationFillMode += `, ${fillMode}`;
  } else {
    entity.style.animationFillMode = `${fillMode}`;
  }

  if (entity.style.animationTimingFunction.length) {
    entity.style.animationTimingFunction += `, ${timingFunc}`;
  } else {
    entity.style.animationTimingFunction = `${timingFunc}`;
  }

  if (entity.style.animationName.length) {
    entity.style.animationName += `, ${name}`;
  } else {
    entity.style.animationName = `${name}`;
  }
}

function generateNewLine(color) {
  let line = document.createElement("div");

  line.style.position = "absolute";
  line.style.height = `${LINE_HEIGHT}%`;
  line.style.width = `${LINE_WIDTH}px`;
  line.style.backgroundColor = color;
  line.style.transform = "scaleX(0)";

  return line;
}

setTimeout(translateSquares, BASE_ANIM_PAUSE);
