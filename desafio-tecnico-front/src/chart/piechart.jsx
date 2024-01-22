import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import 'chart.js/auto';

const PieChart = ({ data }) => {
    const chartRef = useRef();
    const chartInstance = useRef(null);
  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      // Destroy existing Chart instance if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Create a new Chart instance
      chartInstance.current = new Chart(ctx, {
        type: 'pie',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.values,
            backgroundColor: data.colors,
          }],
        },
      });
  
      // Clean up on component unmount
      return () => {
        if (chartInstance.current) {
          chartInstance.current.destroy();
        }
      };
    }, [data]);
  
    return <canvas ref={chartRef} />;
};
  
export default PieChart;