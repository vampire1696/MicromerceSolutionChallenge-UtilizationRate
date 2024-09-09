import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { useMemo } from "react";
import sourceData from "./source-data.json";
import type { SourceDataType, TableDataType } from "./types";

/**
 * Example of how a tableData object should be structured.
 *
 * Each `row` object has the following properties:
 * @prop {string} person - The full name of the employee.
 * @prop {number} past12Months - The value for the past 12 months.
 * @prop {number} y2d - The year-to-date value.
 * @prop {number} may - The value for May.
 * @prop {number} june - The value for June.
 * @prop {number} july - The value for July.
 * @prop {number} netEarningsPrevMonth - The net earnings for the previous month.
 */

const tableData: TableDataType[] = (
  sourceData as unknown as SourceDataType[]
).map((dataRow, index) => {
  const person = `${
    dataRow?.employees?.firstname || dataRow?.externals?.firstname
  } - ...`;
  const past12Months = parseFloat(
    dataRow?.employees?.workforceUtilisation?.utilisationRateLastTwelveMonths ||
      dataRow?.externals?.workforceUtilisation
        ?.utilisationRateLastTwelveMonths ||
      "0"
  );
  const y2d = parseFloat(
    dataRow?.employees?.workforceUtilisation?.utilisationRateYearToDate ||
      dataRow?.externals?.workforceUtilisation?.utilisationRateYearToDate ||
      "0"
  );
  const juneUtilisation = parseFloat(
    dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.at(2)
      ?.utilisationRate ||
      dataRow?.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.at(
        2
      )?.utilisationRate ||
      "0"
  );
  const julyUtilisation = parseFloat(
    dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.at(1)
      ?.utilisationRate ||
      dataRow?.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.at(
        1
      )?.utilisationRate ||
      "0"
  );
  const augustUtilisation = parseFloat(
    dataRow?.employees?.workforceUtilisation?.lastThreeMonthsIndividually?.at(0)
      ?.utilisationRate ||
      dataRow?.externals?.workforceUtilisation?.lastThreeMonthsIndividually?.at(
        0
      )?.utilisationRate ||
      "0"
  );
  const netEarningsPrevMonth =
    dataRow?.employees?.workforceUtilisation?.monthlyCostDifference ??
    dataRow?.externals?.workforceUtilisation?.monthlyCostDifference;

  const row: TableDataType = {
    person: `${person}`,
    past12Months: `${past12Months * 100} % `,
    y2d: ` ${y2d * 100}  % `,
    june: ` ${juneUtilisation * 100} %`,
    july: ` ${julyUtilisation * 100} %`,
    august: ` ${augustUtilisation * 100} %`,
    netEarningsPrevMonth: ` ${netEarningsPrevMonth} EUR `,
  };

  return row;
});

const Example = () => {
  const columns = useMemo<MRT_ColumnDef<TableDataType>[]>(
    () => [
      {
        accessorKey: "person",
        header: "Person",
      },
      {
        accessorKey: "past12Months",
        header: "Past 12 Months",
      },
      {
        accessorKey: "y2d",
        header: "Y2D",
      },
      {
        accessorKey: "june",
        header: "June",
      },
      {
        accessorKey: "july",
        header: "July",
      },
      {
        accessorKey: "august",
        header: "August",
      },
      {
        accessorKey: "netEarningsPrevMonth",
        header: "Net Earnings Prev Month",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: tableData,
  });

  return <MaterialReactTable table={table} />;
};

export default Example;
