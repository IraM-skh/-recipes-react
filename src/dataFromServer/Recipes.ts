import { Recipes } from "../interfacesAndTypesTs/recipesInterfaces";
// export const RECIPES: Recipes = [
//   {
//     title: "Салат Мальтийский",
//     imgUrl: "src/recImages/u9661-c88f95ca8d982b4381dacc2d88ebdbba.jpg",
//     ingridients: {
//       Руккола: [100, "гр."],
//       "Креветки крупные": [5, "шт."],
//       "Беби кальмары": [5, "шт."],
//       Маслины: [40, "гр."],
//       "Помидоры черри": [3, "шт."],
//       "Огурец свежий": [30, "шт."],
//       "Перец болгарский": [20, "гр."],
//       Соль: ["по вкусу"],
//       "Перец ч.м.": ["по вкусу"],
//       "Масло оливковое": [1.5, "ст.л."],
//       "Лимонный сок": [1, "ч.л."],
//       "Крем бальзамик": ["по желанию"],
//     },
//     tags: {
//       type: ["Салат", "Холодное"],
//       diet: ["Без глютена", "Без картофеля", "Без жирного мяса"],
//     },
//   },
//   {
//     title: "Салат Мальтийский2",
//     imgUrl: "src/recImages/u9661-c88f95ca8d982b4381dacc2d88ebdbba.jpg",
//     ingridients: {
//       Руккола: [100, "гр."],
//       "Креветки крупные": [5, "шт."],
//       "Беби кальмары": [5, "шт."],
//       Маслины: [40, "гр."],
//       "Помидоры черри": [3, "шт."],
//       "Огурец свежий": [30, "шт."],
//       "Перец болгарский": [20, "гр."],
//       Соль: ["по вкусу"],
//       "Перец ч.м.": ["по вкусу"],
//       "Масло оливковое": [1.5, "ст.л."],
//       "Лимонный сок": [1, "ч.л."],
//       "Крем бальзамик": ["по желанию"],
//     },
//     tags: {
//       type: ["Салат", "Холодное"],
//       diet: ["Без глютена", "Без картофеля", "Без жирного мяса"],
//     },
//   },
//   {
//     title: "Салат Мальтийский3",
//     imgUrl: "src/recImages/u9661-c88f95ca8d982b4381dacc2d88ebdbba.jpg",
//     ingridients: {
//       Руккола: [100, "гр."],
//       "Креветки крупные": [5, "шт."],
//       "Беби кальмары": [5, "шт."],
//       Маслины: [40, "гр."],
//       "Помидоры черри": [3, "шт."],
//       "Огурец свежий": [30, "шт."],
//       "Перец болгарский": [20, "гр."],
//       Соль: ["по вкусу"],
//       "Перец ч.м.": ["по вкусу"],
//       "Масло оливковое": [1.5, "ст.л."],
//       "Лимонный сок": [1, "ч.л."],
//       "Крем бальзамик": ["по желанию"],
//     },
//     tags: {
//       type: ["Салат", "Холодное"],
//       diet: ["Без глютена", "Без картофеля", "Без жирного мяса"],
//     },
//   },
// ];

// const getRecipesData = async (): Promise<string> => {
//   const servAnsver: string = JSON.stringify(RECIPES);
//   const promise: string = await new Promise(function (resolve, reject) {
//     if (RECIPES.length === 0) {
//       reject(new Error("Ошибка загрузки"));
//     }
//     resolve(servAnsver);
//   });
//   return promise;
// };

// export default getRecipesData;
