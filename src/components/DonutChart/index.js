import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import colors from '../../styles/colors';

const screenWidth = Dimensions.get('window').width;

const DonutChart = ({ data }) => {
  const processedData = data.map((item) => ({
    ...item,
    legendFontColor: colors.black,
    legendFontSize: 20,
  }));

  const chartConfig = {
    backgroundGradientFrom: '#FFFFFF',
    backgroundGradientTo: '#FFFFFF',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };

  const chartStyle = {
    marginLeft: -280,
  };

  return (
    <PieChart
      data={processedData}
      width={screenWidth}
      height={150}
      chartConfig={chartConfig}
      accessor="population"
      backgroundColor="transparent"
      absolute
      center={[180, 0]} //coordenadas x e y para posicionar el gráfico
      style={chartStyle} //aplica el estilo personalizado
      
    />
  );
};

export default DonutChart;