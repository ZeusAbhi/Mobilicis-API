import User from "./userSchema";


export const userFilters = {
  // 1. Users which have income lower than $5 USD and have a car of brand “BMW” or “Mercedes”.
  incomeLowerThan5AndCarBrandBMWOrMercedes: async () => {
    const users = await User.find({
      income: {
        $lt: 5
      },
      car: {
        $in: ["BMW", "Mercedes-Benz"]
      }
    });
    return users;
  },
  // 2. Male Users which have phone price greater than 10,000.
  maleUsersWithPhonePriceGreaterThan10000: async () => {
    const users = await User.find({
      gender: "Male",
      phone_price: {
        $gt: 10000
      }
    })
    return users;
  },
  // 3. Users whose last name starts with “M” and has a quote character length greater than 15 and email includes his/her last name.
  usersWithLastNameStartsWithMAndQuoteLengthGreaterThan15AndEmailIncludesLastName: async () => {
    const users = await User.find({
      $expr: {
        $and: [
          {
            $gt: [{ $strLenCP: "$quote" }, 15]
          },
          {
            $regexMatch: { input: "$last_name", regex: /^M/ }
          },
          {
            $regexMatch: { input: "$email", regex: "$last_name", options: "i" }
          }
        ]
      }
    })
    return users;
  },
  // 4. Users which have a car of brand “BMW”, “Mercedes” or “Audi” and whose email does not include any digit.
  usersWithCarBrandBMWOrMercedesOrAudiAndEmailDoesNotIncludeAnyDigit: async () => {
    const users = await User.find({
      car: {
        $in: ["BMW", "Mercedes-Benz", "Audi"]
      },
      email: {
        $not: /\d/
      }
    })
    return users;
  },
  // 5. Show the data of top 10 cities which have the highest number of users and their average income.
  top10CitiesWithHighestNumberOfUsersAndAverageIncome: async () => {
    const usersInCity = await User.aggregate([
      {
        $group: {
          _id: "$city",
          count: {
            $sum: 1
          },
          averageIncome: {
            $avg: "$income"
          }
        }
      },
      {
        $sort: {
          count: -1
        }
      },
      {
        $limit: 10
      }
    ])
    return usersInCity;
  }
};
