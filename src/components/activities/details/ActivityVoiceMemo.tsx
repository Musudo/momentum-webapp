import {useEffect, useState} from 'react';
import {useAudioRecorder} from 'react-audio-voice-recorder';
import StopCircleIcon from '@mui/icons-material/StopCircle';
import {Box, IconButton, Stack, Tooltip, Typography} from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import {IActivity} from "../../../types/models/IActivity";
import ClearIcon from '@mui/icons-material/Clear';

type TActivityVoiceMemoProps = {
    activity: IActivity;
}

const ActivityVoiceMemo = ({activity}: TActivityVoiceMemoProps) => {
    const recorderControls = useAudioRecorder();
    const [isDisabled, setIsDisabled] = useState(!!activity.voiceMemo);
    // recorderControls.recordingBlob is always undefined at first
    const [recording, setRecording] = useState<Blob | undefined>(recorderControls.recordingBlob);
    // const queryClient = useQueryClient();

    useEffect(() => {
        if (recorderControls.recordingBlob != undefined) {
            setRecording(recorderControls.recordingBlob);
            saveRecording(recorderControls.recordingBlob);
        }
    }, [recorderControls.recordingBlob]);

    // const modifyVoiceMemoMutation = useMutation(
    // 	{
    // 		mutationFn: (formData: object) => fetchVoiceMemo.post(`/file/voice-memo/${activity.id}`, formData),
    // 		onSuccess: () => {
    // 			queryClient.invalidateQueries({queryKey: ['activity']});
    // 		}
    // 	}
    // );

    const saveRecording = (recordingBlob: any) => {
        const formData = new FormData();
        formData.append('voice_memo', recordingBlob);

        // modifyVoiceMemoMutation.mutate(formData);
    }

    // const deleteVoiceMemoMutation = useMutation(
    // 	{
    // 		mutationFn: () => fetchVoiceMemo.delete(`/file/voice-memo/${activity.id}`),
    // 		onSuccess: () => {
    // 			queryClient.invalidateQueries({queryKey: ['activity']});
    // 		}
    // 	}
    // );

    return (
        <div>
            <Box mb={1} color="text.secondary">
                <Typography component="span" variant="body1">
                    Voice memo
                </Typography>
            </Box>
            <Box mb={1}>
                {recorderControls.isRecording ? (
                    <>
                        <Tooltip title="Stop recording">
                            <IconButton color="primary" onClick={() => {
                                recorderControls.stopRecording();
                                setIsDisabled(true);
                            }}>
                                <StopCircleIcon/>
                            </IconButton>
                        </Tooltip>
                        {isDisabled ? "" : <span className="blink">&nbsp;Recording...</span>}
                    </>
                ) : (
                    <Tooltip title="Start recording">
                        <IconButton color="primary" disabled={isDisabled}
                                    onClick={() => recorderControls.startRecording()}>
                            <MicIcon/>
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Box>
                {(recording || activity.voiceMemo?.path) && (
                    <Stack direction="row" spacing={2}>
                        <audio controls>
                            <source src={recording
                                ? URL.createObjectURL(recording)
                                : activity.voiceMemo?.path.split("public")[1]}
                                    type="audio/mp3"/>
                        </audio>
                        <Tooltip title="Delete memo">
                            <IconButton
                                color="default"
                                disableRipple
                                disableFocusRipple
                                onClick={() => {
                                setIsDisabled(false);
                                setRecording(undefined);
                                // deleteVoiceMemoMutation.mutate();
                            }}>
                                <ClearIcon/>
                            </IconButton>
                        </Tooltip>
                    </Stack>
                )}
            </Box>
        </div>
    );
}

export default ActivityVoiceMemo;