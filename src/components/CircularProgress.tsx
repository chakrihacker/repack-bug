import Animated, {
  interpolate,
  useAnimatedProps,
  withTiming,
} from 'react-native-reanimated';
import React, {FC} from 'react';
import Svg, {Circle} from 'react-native-svg';

import {StyleSheet} from 'react-native';

interface BBCircularProgressProps {
  thickness: number;
  size: number;
  color: string;
  progress: number;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const CircularProgress: FC<BBCircularProgressProps> = ({
  size = 60,
  thickness = 2,
  color,
  progress = 1,
}) => {
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  const animatedProps = useAnimatedProps(() => {
    const progressToRadians = interpolate(progress, [1, 0], [0, Math.PI * 2]);
    const strokeDashoffset = withTiming(progressToRadians * radius, {
      duration: 200,
    });

    return {
      strokeDashoffset,
    };
  });

  return (
    <Svg style={StyleSheet.absoluteFill}>
      <AnimatedCircle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill={'none'}
        stroke={color}
        strokeWidth={thickness}
        strokeDasharray={[circumference, circumference]}
        animatedProps={animatedProps}
      />
    </Svg>
  );
};
