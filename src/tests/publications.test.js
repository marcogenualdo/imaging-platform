import { groupByYear } from "../pages/publications";

describe("groupByYear", () => {
  test("empty", () => {
    const data = [];

    const res = groupByYear(data);
    expect(res).toMatchObject({});
  });

  test("full", () => {
    const data = [
      { year: 2021, a: "stra" },
      { year: 2021, a: "stra2" },
      { year: 2021, a: "stra3" },
      { year: 2020, a: "stra4" },
      { year: 2020, a: "stra5" },
    ];
    const exp = {
      2021: [
        { year: 2021, a: "stra" },
        { year: 2021, a: "stra2" },
        { year: 2021, a: "stra3" },
      ],
      2020: [
        { year: 2020, a: "stra4" },
        { year: 2020, a: "stra5" },
      ],
    };

    const res = groupByYear(data);
    expect(res).toMatchObject(exp);
  });
});
