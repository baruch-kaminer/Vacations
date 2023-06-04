import './VacationsChart.css';

import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useContext, useEffect, useState } from 'react';
import VacationModel from '../../../Models/vacation-model';
import vacationsServices from '../../../Services/vacationsServices';
import notifyService from '../../../Services/NotifyService';
import AuthContext from '../../../Context/AuthContext';
import UserModel from '../../../Models/UserModel';



function VacationsChart(): JSX.Element{

  const { auth } = useContext(AuthContext);
  const user: UserModel = auth.user;

  const [vacations, setVacations] = useState<VacationModel[]>([]);

  useEffect(() => {
      vacationsServices.getAllVacations()
      .then(vacations => setVacations(vacations))
      .catch(err => notifyService.error(err))
  }, [])

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Tracking Data',
      },
    },
  };

  const labels:any = [];
  const yAxis:any = [];
  vacations.map(v => {
    if (v.amountFollowers > 0){
      labels.push(v.destination);
      yAxis.push(v.amountFollowers)
      } 
    });

   const data = {
    labels,
    datasets: [
      {
        label: 'Amount followers',
        data: yAxis,
        backgroundColor: 'rgba(255, 127, 80, 0.5)',
      }
    ]
  };
  
 
    return(
        <div className='VacationsChart'>
          { user?.role === 'Admin' && <Bar options={options} data={data} /> }        
        </div>
    )
}

export default VacationsChart;

