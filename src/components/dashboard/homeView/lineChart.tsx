import {useTheme} from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import {LineChart as LineChartMui} from '@mui/x-charts/LineChart';
import {CurveType} from "@mui/x-charts";

type TGradientStyle = {
    fill: string;
};

type TStackOrder = 'ascending' | 'descending';

type TSeries = {
    id: string;
    label: string;
    data: number[];
    showMark?: boolean;
    curve?: CurveType;
    stack?: string;
    area?: boolean;
    stackOrder?: TStackOrder;
}

export type TLineChartProps = {
    title: string;
    value: number;
    caption: string;
    series: TSeries[];
    colors?: string[];
    months: string[];
    legendHidden?: boolean;
    height?: number;
    margin?: { left: number; right: number; top: number; bottom: number };
    grid?: { horizontal?: boolean; vertical?: boolean };
};

const AreaGradient = ({color, id}: { color: string; id: string }) => {
    return (
        <defs>
            <linearGradient id={id} x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor={color} stopOpacity={0.5}/>
                <stop offset="100%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
        </defs>
    );
}

const LineChart = (props: TLineChartProps) => {
    const {
        title,
        value,
        caption,
        series,
        colors,
        months,
        height,
        margin,
        grid,
        legendHidden,
    } = props;
    const theme = useTheme();

    // Use provided colors or default to a theme-based palette
    const defaultColors = [
        theme.palette.primary.light,
        theme.palette.primary.main,
        theme.palette.primary.dark,
    ];
    const chartColors = colors || defaultColors;

    const gradientStyles = series.reduce((acc, s) => {
        if (s.area) {
            acc[`.MuiAreaElement-series-${s.id}`] = {fill: `url('#${s.id}')`};
        }
        return acc;
    }, {} as Record<string, TGradientStyle>);

    return (
        <Card variant="outlined" sx={{width: '100%', borderRadius: 4}}>
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
                    </Stack>
                    <Typography variant="caption" sx={{color: 'text.secondary'}}>
                        {caption}
                    </Typography>
                </Stack>
                <LineChartMui
                    colors={colors}
                    xAxis={[
                        {
                            scaleType: 'point',
                            data: months,
                            tickInterval: (_index, i) => (i + 1) % 5 === 0,
                        },
                    ]}
                    series={series}
                    height={height}
                    margin={margin}
                    grid={grid}
                    sx={gradientStyles}
                    slotProps={{
                        legend: {hidden: legendHidden},
                    }}
                >
                    {series.map((s, index) =>
                        s.area ? (
                            <AreaGradient key={s.id} color={chartColors[index % chartColors.length]} id={s.id}/>
                        ) : null
                    )}
                </LineChartMui>
            </CardContent>
        </Card>
    );
}

export default LineChart;