const PRINT_CONFIG = {
  FIRST_PAGE_ITEMS: 2,
  ITEMS_PER_PAGE: 5,
};

// px기준
// 297mm * 3.7795275591px - 60px - 35px = 1027px
// A4 세로 길이를 px로 변환하고 상하 padding과 헤더 높이를 제외한 값
const CONTENTS_MAX_HEIGHT = 1027;

export { PRINT_CONFIG, CONTENTS_MAX_HEIGHT };
