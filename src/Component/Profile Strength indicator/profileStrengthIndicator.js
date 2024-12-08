import * as React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import PropTypes from 'prop-types';

export default function ProfileStrengthIndicator(props) {
  const settings = {
    width: 250,
    height: 200,
    value: props.profileStrengthVal,
  };

  // Function to calculate color based on value
  const getColor = (value) => {
    if (value >= 0 && value < 40) {
      return 'red';
    } else if (value >= 40 && value < 60) {
      return 'yellow';
    } 
    else if (value >= 60 && value < 80) {
      return '#fd7e14';
    } else {
      return 'green';
    }
  };

  return (
    <Gauge
      {...settings}
      startAngle={-110}
      endAngle={110}
      sx={(theme) => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: 40,
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: getColor(settings.value),
        },
        [`& .${gaugeClasses.referenceArc}`]: {
          fill: theme.palette.text.disabled,
        },
      })}
      text={({ value, valueMax }) => `${value} / ${valueMax}`} // Show value as value / 100
    />
  );
}


// Add PropType validation
ProfileStrengthIndicator.propTypes = {
  profileStrengthVal: PropTypes.number.isRequired, // Ensures profileStrengthVal is a required number
};