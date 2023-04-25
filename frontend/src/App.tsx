import { useEffect, useState } from 'react';
import './App.css'
type UserData = {
  id: number,
  first_name: string,
  last_name: string,
  email: string,
  gender: string,
  income: number,
  city: string,
  car: string,
  quote: string,
  phone_price: number
}
type CityData = {
  _id: string,
  count: number,
  averageIncome: number
}

const validRoutes = ["incomeLowerThan5AndCarBrandBMWOrMercedes", "maleUsersWithPhonePriceGreaterThan10000", "usersWithLastNameStartsWithMAndQuoteLengthGreaterThan15AndEmailIncludesLastName", "usersWithCarBrandBMWOrMercedesOrAudiAndEmailDoesNotIncludeAnyDigit", "top10CitiesWithHighestNumberOfUsersAndAverageIncome"] as const;
const routeNames = {
  incomeLowerThan5AndCarBrandBMWOrMercedes: "Income lower than 5 and car brand BMW or Mercedes",
  maleUsersWithPhonePriceGreaterThan10000: "Male users with phone price greater than 10000",
  usersWithLastNameStartsWithMAndQuoteLengthGreaterThan15AndEmailIncludesLastName: "Users with last name starts with M and quote length greater than 15 and email includes last name",
  usersWithCarBrandBMWOrMercedesOrAudiAndEmailDoesNotIncludeAnyDigit: "Users with car brand BMW or Mercedes or Audi and email does not include any digit",
  top10CitiesWithHighestNumberOfUsersAndAverageIncome: "Top 10 cities with highest number of users and average income"
} as const

function App() {
  const [userData, setUserData] = useState<UserData[]>([])
  const [route, setRoute] = useState<keyof typeof routeNames>(validRoutes[4])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingCityData, setIsLoadingCityData] = useState(false)
  const [error, setError] = useState("")
  const [errorCityData, setErrorCityData] = useState("")
  const [cityData, setCityData] = useState<CityData[]>([])

  useEffect(() => {
    setIsLoading(true)
    setUserData([])
    setError("")
    fetch(`${import.meta.env.VITE_SERVERBASEURL}/users/${route}`).then(res => res.json()).then(data => {
      setUserData(data)
      setIsLoading(false)
    }).catch(err => {
      setError(err.message)
      setIsLoading(false)
    })
  }, [route])

  useEffect(() => {
    setIsLoadingCityData(true)
    setCityData([])
    setErrorCityData("")
    fetch(`${import.meta.env.VITE_SERVERBASEURL}/users/top10CitiesWithHighestNumberOfUsersAndAverageIncome`).then(res => res.json()).then(data => {
      setCityData(data)
      setIsLoadingCityData(false)
    }).catch(err => {
      setErrorCityData(err.message)
      setIsLoadingCityData(false)
    })
  }, [])


  return (
    <div className="flex flex-col gap-2 dark:bg-black dark:text-white min-h-screen sm:px-4 py-4 w-full">
      <div className="flex flex-row mb-4 w-full overflow-x-auto">
        {/* <button className="tab focus:outline-none border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 mx-2">Tab 1</button> */}
        {validRoutes.map((curroute, index) => {
          return <button key={index} className={`focus:outline-none border-b-2 border-gray-300 dark:border-gray-700 py-2 px-4 mx-2 ${curroute === route ? "border-blue-500 dark:border-blue-500" : ""}`} onClick={() => setRoute(curroute)}>{routeNames[curroute]}</button>
        })}
      </div>
      {
        route === "top10CitiesWithHighestNumberOfUsersAndAverageIncome" ? <CityData isLoadingCityData={isLoadingCityData} errorCityData={errorCityData} cityData={cityData} /> : <UserTable isLoading={isLoading} error={error} userData={userData} />
      }
    </div>
  )
}

const CityData = (props: { isLoadingCityData: any, errorCityData: string, cityData: CityData[] }) => {
  return <div className='overflow-x-auto w-full flex flex-col'>
    <table className="border border-gray-300 dark:border-gray-700 dark:text-white">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2">City</th>
          <th className="px-4 py-2">Number of Users</th>
          <th className="px-4 py-2">Average Income</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900">
        {props.isLoadingCityData && <tr><td colSpan={10} className="px-4 py-2">Loading...</td></tr>}
        {props.errorCityData && <tr><td colSpan={10} className="px-4 py-2">{props.errorCityData}</td></tr>}
        {props.cityData.map((city, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{city._id}</td>
            <td className="px-4 py-2 text-center">{city.count}</td>
            <td className="px-4 py-2 text-center">{city.averageIncome.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

const UserTable = (props: { isLoading: boolean, error: string, userData: UserData[] }) => {
  return <div className='overflow-x-auto w-full flex flex-col'>
    <table className="border border-gray-300 dark:border-gray-700 dark:text-white">
      <thead className="bg-gray-100 dark:bg-gray-800">
        <tr>
          <th className="px-4 py-2">Id</th>
          <th className="px-4 py-2">First Name</th>
          <th className="px-4 py-2">Last Name</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Gender</th>
          <th className="px-4 py-2">Income</th>
          <th className="px-4 py-2">City</th>
          <th className="px-4 py-2">Car</th>
          <th className="px-4 py-2">Quote</th>
          <th className="px-4 py-2">Phone Price</th>
        </tr>
      </thead>
      <tbody className="bg-white dark:bg-gray-900">
        {props.isLoading && <tr><td colSpan={10} className="px-4 py-2">Loading...</td></tr>}
        {props.error && <tr><td colSpan={10} className="px-4 py-2">{props.error}</td></tr>}
        {props.userData.map((user, index) => (
          <tr key={index}>
            <td className="px-4 py-2">{user.id}</td>
            <td className="px-4 py-2">{user.first_name}</td>
            <td className="px-4 py-2">{user.last_name}</td>
            <td className="px-4 py-2">{user.email}</td>
            <td className="px-4 py-2">{user.gender}</td>
            <td className="px-4 py-2">{user.income}</td>
            <td className="px-4 py-2">{user.city}</td>
            <td className="px-4 py-2">{user.car}</td>
            <td className="px-4 py-2">{user.quote}</td>
            <td className="px-4 py-2">{user.phone_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
}

export default App
