import { groupByYear } from "../pages/publications";

describe("groupByYear", () => {
  test("empty", () => {
    const data = [];

    const res = groupByYear(data);
    expect(res).toMatchObject({});
  });

  test("full", () => {
    const data = [
      { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra1" } } },
      { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra2" } } },
      { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra3" } } },
      { childMarkdownRemark: { frontmatter: { year: 2020, a: "stra4" } } },
      { childMarkdownRemark: { frontmatter: { year: 2020, a: "stra5" } } },
    ];
    const exp = {
      2021: [
        { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra1" } } },
        { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra2" } } },
        { childMarkdownRemark: { frontmatter: { year: 2021, a: "stra3" } } },
      ],
      2020: [
        { childMarkdownRemark: { frontmatter: { year: 2020, a: "stra4" } } },
        { childMarkdownRemark: { frontmatter: { year: 2020, a: "stra5" } } },
      ],
    };

    const res = groupByYear(data);
    expect(res).toMatchObject(exp);
  });
});
