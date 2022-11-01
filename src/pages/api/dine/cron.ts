import { DINEHOURS, FoodType } from "@prisma/client";
import { CronJob } from "cron";
import addDays from "../../../lib/addDays";
import addDaysToDay from "../../../lib/addDaysToDay";
import { prisma } from "../../../server/db/client";

const cronJob = new CronJob(
  "0 0 * * SAT",
  async () => {
    const foods = await prisma?.food.findMany();
    const soupList = foods?.filter((e) => e.type === FoodType.SOUP);
    const mainList = foods?.filter((e) => e.type === FoodType.MAIN);
    const sideList = foods?.filter((e) => e.type === FoodType.SIDE);
    const extraList = foods?.filter((e) => e.type === FoodType.EXTRA);
    var d = new Date();
    let monday = d.setDate(d.getDate() + ((1 + 7 - d.getDay()) % 7));
    let newDineList = [];
    for (let i = 0; i < 5; i++) {
      newDineList.push({
        date: new Date(addDaysToDay(monday, i)),
        type: DINEHOURS.BREAKFAST,
        foods: {
          connect: [
            { id: getRandomFood(soupList) },
            { id: getRandomFood(mainList) },
            { id: getRandomFood(sideList) },
            { id: getRandomFood(extraList) },
          ],
        },
      });
      newDineList.push({
        date: new Date(addDaysToDay(monday, i)),
        type: DINEHOURS.LUNCH,
        foods: {
          connect: [
            { id: getRandomFood(soupList) },
            { id: getRandomFood(mainList) },
            { id: getRandomFood(sideList) },
            { id: getRandomFood(extraList) },
          ],
        },
      });
      newDineList.push({
        date: new Date(addDaysToDay(monday, i)),
        type: DINEHOURS.DINNER,
        foods: {
          connect: [
            { id: getRandomFood(soupList) },
            { id: getRandomFood(mainList) },
            { id: getRandomFood(sideList) },
            { id: getRandomFood(extraList) },
          ],
        },
      });
    }
    newDineList.forEach(async (e) => {
      await prisma?.dine.create({
        data: {
          type: e.type,
          date: e.date,
          foods: { connect: e.foods.connect.map((x) => ({ id: x.id })) },
        },
      });
    });
  },
  null,
  true
);

const dineCronHandler = async (req, res) => {
  res.send(cronJob.nextDates().toString());
};

function getRandomFood(array) {
  return array[getRndInteger(0, array?.length)]?.id;
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export default dineCronHandler;
