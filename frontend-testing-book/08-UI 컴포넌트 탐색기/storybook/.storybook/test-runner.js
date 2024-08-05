const { getStoryContext } = require("@storybook/test-runner");
/**
 * 스토리북의 테스트러너는 플레이라이트와 헤드리스 브라우저에서 실행
 * => axe-playwright 는 접근성 검증 도구는 axe를 사용하는 라이브러리로 접근성 관련 문제점을 찾는다
 */
const { injectAxe, checkA11y, configureAxe } = require("axe-playwright");

module.exports = {
  /**
   * 스토리마다 설정한 뷰포트가 테스트 러너에 적용되지 않는 문제가 있다
   *
   * => SP로 시작하는 스토리와 그 외의 스토리의 뷰포트를 따로 설정
   */
  async preRender(page, context) {
    if (context.name.startsWith("SP")) {
      page.setViewportSize({ width: 375, height: 667 });
    } else {
      page.setViewportSize({ width: 1280, height: 800 });
    }
    // axe 를 사용하는 검증 설정
    await injectAxe(page);
  },
  async postRender(page, context) {
    const storyContext = await getStoryContext(page, context);
    if (storyContext.parameters?.a11y?.disable) {
      return;
    }
    await configureAxe(page, {
      rules: storyContext.parameters?.a11y?.config?.rules,
    });
    // axe 를 사용하는 검증 설정
    await checkA11y(page, "#root", {
      // "Violations"에 해당하는 오류만 검출
      // 오류 검출 수준을 조정하면서 단계적으로 개선을 시도할 수 있다
      includedImpacts: ["critical", "serious"],
      detailedReport: false,
      detailedReportOptions: { html: true },
      axeOptions: storyContext.parameters?.a11y?.options,
    });
  },
};
