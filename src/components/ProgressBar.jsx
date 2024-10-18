import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

const ProgressBar = ({ forGoal, goalAmount }) => {
    const radius = 48;
    const strokeWidth = 8;
    const circumference = 2 * Math.PI * radius;

    console.log(parseFloat(goalAmount))

    console.log(parseFloat(forGoal))

    const parsedForGoal = parseFloat(forGoal);
    const parsedGoal = parseFloat(goalAmount);
    
    const percentage = parsedGoal > 0 ? (parsedForGoal / parsedGoal) * 100 : 0;

    console.log(percentage)

    const offset = circumference - (percentage / 100) * circumference;

    return (
        <View style={styles.container}>
            <Svg height={radius * 2 + strokeWidth} width={radius * 2 + strokeWidth}>
                <Circle
                    stroke="#d9d9d9"
                    fill="none"
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke="#14b910"
                    fill="none"
                    cx={radius + strokeWidth / 2}
                    cy={radius + strokeWidth / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${radius + strokeWidth / 2} ${radius + strokeWidth / 2})`}
                />
                <SvgText
                    fill="#000"
                    fontSize="18"
                    fontWeight='600'
                    x={radius + strokeWidth / 2}
                    y={radius + strokeWidth / 2}
                    textAnchor="middle"
                    alignmentBaseline="middle"
                >
                    {`${percentage.toFixed(2)}%`}
                </SvgText>
            </Svg>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
});

export default ProgressBar;
