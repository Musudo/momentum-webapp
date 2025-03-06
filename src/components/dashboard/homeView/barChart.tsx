import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {BarChart as BarChartMui} from '@mui/x-charts/BarChart';
import {useTheme} from '@mui/material/styles';
import {TTrend} from '../../../types/statTypes';

export type TBarChartProps = {
    title: string;
    value: number;
    caption: string;
    series: Array<any>;
    trend: TTrend;
    months: string[];
    borderRadius?: number;
    colors?: string[];
    height?: number;
    margin?: { left: number; right: number; top: number; bottom: number };
    grid?: { horizontal?: boolean; vertical?: boolean };
    slotProps?: any;
}

const BarChart = ({
                      title,
                      value,
                      caption,
                      series,
                      colors,
                      trend,
                      months,
                      borderRadius = 8,
                      height = 250,
                      margin = {left: 50, right: 0, top: 20, bottom: 20},
                      grid = {horizontal: true},
                      slotProps = {legend: {hidden: true}},
                  }: TBarChartProps) => {
    const theme = useTheme();
    const colorPalette = colors || [
        (theme).palette.primary.dark,
        (theme).palette.primary.main,
        (theme).palette.primary.light,
    ];

    // const trendColors = {
    //     up:
    //         theme.palette.mode === 'light'
    //             ? theme.palette.success.main
    //             : theme.palette.success.dark,
    //     down:
    //         theme.palette.mode === 'light'
    //             ? theme.palette.error.main
    //             : theme.palette.error.dark,
    //     neutral:
    //         theme.palette.mode === 'light'
    //             ? theme.palette.grey[400]
    //             : theme.palette.grey[700],
    // };
    const labelColors = {
        up: 'success' as const,
        down: 'error' as const,
        neutral: 'default' as const,
    };
    const color = labelColors[trend];
    // const chartColor = trendColors[trend];
    const trendValues = {up: '+25%', down: '-25%', neutral: '+5%'};

    return (
        <Card variant="outlined" sx={{width: '100%'}}>
            <CardContent>
                <Typography component="h2" variant="subtitle2" gutterBottom>
                    {title}
                </Typography>
                <Stack sx={{justifyContent: 'space-between'}}>
                    <Stack
                        direction="row"
                        sx={{
                            alignContent: {xs: 'center', sm: 'flex-start'},
                            alignItems: 'center',
                            gap: 1,
                        }}
                    >
                        <Typography variant="h4" component="p">
                            {value}
                        </Typography>
                        <Chip size="small" color={color} label={trendValues[trend]}/>
                    </Stack>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {caption}
                    </Typography>
                </Stack>
                <BarChartMui
                    borderRadius={borderRadius}
                    colors={colorPalette}
                    xAxis={[
                        {
                            scaleType: 'band',
                            // categoryGapRatio: 0.5,
                            data: months,
                        },
                    ]}
                    series={series}
                    height={height}
                    margin={margin}
                    grid={grid}
                    slotProps={slotProps}
                />
            </CardContent>
        </Card>
    );
}

export default BarChart;
