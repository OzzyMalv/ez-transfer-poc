import { ISession } from "@/api/types/receivedTransfers.types";
import dayjs from "dayjs";

// Going through the array of received transfers and grouping them by date
// where the key is the day and the value is an array of received transfers for that day
// when the date is today, it will be grouped under "Today"
export const fileSessionsMapped = (
  fileSessions: ISession[],
): { [key: string]: ISession[] } => {
  return [...fileSessions]
    .sort((a: ISession, b: ISession) => {
      return -a.creationDate.localeCompare(b.creationDate);
    })
    .reduce((acc: { [key: string]: ISession[] }, session) => {
      let formattedDate;
      const inputDate = dayjs(session.creationDate);
      const today = dayjs();
      if (inputDate.isSame(today, "day")) {
        formattedDate = "Today";
      } else {
        // FIXME: needs to be internationalized
        formattedDate = inputDate.format("DD MMM YYYY");
      }

      if (!acc[formattedDate]) {
        acc[formattedDate] = [];
      }
      acc[formattedDate].push(session);
      return acc;
    }, {});
};
