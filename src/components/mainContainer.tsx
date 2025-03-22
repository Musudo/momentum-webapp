import React from "react";
import Stack from '@mui/material/Stack';
import {SxProps, Theme} from '@mui/material';

type TMainContainerProps = {
    children?: React.ReactNode;
    parentStyles?: SxProps<Theme>;
    firstChildStyles?: SxProps<Theme>;
    secondChildStyles?: SxProps<Theme>;
};

export const MainContainer = ({
                                  children,
                                  parentStyles,
                                  firstChildStyles,
                                  secondChildStyles,
                              }: TMainContainerProps) => {
    return (
        <Stack
            direction="column"
            component="main"
            sx={
                ([
                    {
                        justifyContent: 'center',
                        height: 'calc((1 - var(--template-frame-height, 0)) * 100%)',
                        marginTop: 'max(10px - var(--template-frame-height, 0px), 0px)',
                        minHeight: '100%',
                    },
                    (theme) => ({
                        '&::before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            zIndex: -1,
                            inset: 0,
                            backgroundImage:
                                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
                            backgroundRepeat: 'no-repeat',
                            ...theme.applyStyles('dark', {
                                backgroundImage:
                                    'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
                            }),
                        },
                    }),
                    ...(parentStyles ? [parentStyles] : []),
                ] as SxProps<Theme>)
            }
        >
            <Stack
                direction={{xs: 'column-reverse', md: 'row'}}
                sx={
                    ([
                        {
                            justifyContent: 'center',
                            gap: {xs: 6, sm: 12},
                            p: 1,
                            mx: 'auto',
                        },
                        ...(firstChildStyles ? [firstChildStyles] : []),
                    ] as SxProps<Theme>)
                }
            >
                <Stack
                    direction={{xs: 'column-reverse', md: 'row'}}
                    sx={
                        ([
                            {
                                justifyContent: 'center',
                                gap: {xs: 6, sm: 12},
                                p: {xs: 1, sm: 2},
                                m: 'auto',
                            },
                            ...(secondChildStyles ? [secondChildStyles] : []),
                        ] as SxProps<Theme>)
                    }
                >
                    {children}
                </Stack>
            </Stack>
        </Stack>
    );
};
