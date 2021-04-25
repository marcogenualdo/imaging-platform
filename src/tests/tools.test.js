import { groupByYear } from "../tools";

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
    const exp = [
      {
        year: "2021",
        data: [
          { year: 2021, a: "stra1" },
          { year: 2021, a: "stra2" },
          { year: 2021, a: "stra3" },
        ],
      },
      {
        year: "2020",
        data: [
          { year: 2020, a: "stra4" },
          { year: 2020, a: "stra5" },
        ],
      },
    ];

    const res = groupByYear(data);
    expect(res).toMatchObject(exp);
  });
});
