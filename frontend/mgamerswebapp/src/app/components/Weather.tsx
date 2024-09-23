import React from 'react';


interface WeatherData {
    date: string;
    temperatureC: number;
    summary: string;
    temperatureF: number;
}
  
interface WeatherProps {
    data: WeatherData[];
}

const Weather: React.FC<WeatherProps> = ({ data }) => {
    return (
      <div className="p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-4" style={{ color: 'black' }}>Weather Forecast</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temperature (°C)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Temperature (°F)
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Summary
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((weather , index) => (
                <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{weather.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{weather.temperatureC}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{weather.temperatureF}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{weather.summary}</td>
                </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default Weather;