import { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, Chip, Stack, Checkbox, FormControlLabel, Typography, IconButton, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import CloseIcon from '@mui/icons-material/Close';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useSubmit, useParams } from 'react-router-dom';

function CardForm({ open, handleClose, columnId, action, data }) {
    const [title, setTitle] = useState(() => data.title || "");
    const [description, setDescription] = useState(() => data.description || "");
    const [members, setMembers] = useState(() => data.members || []);
    const [subtasks, setSubtasks] = useState(() => data.subtasks || []);
    const [comments, setComments] = useState(() => data.comments || []);
    const [dueDate, setDueDate] = useState(() => new Date(data.dueDate || Date.now()));

    const submit = useSubmit();
    const params = useParams();

    const addSubtask = text => setSubtasks(prev => [...prev, {id: Date.now(), text, completed: false}]);
    const toggleTask = taskId => setSubtasks(prev => prev.map(item => item.id === taskId ? { ...item, completed: !item.completed} : item))
    const deleteSubtask = taskId => setSubtasks(prev => prev.filter(item => item.id !== taskId));

    const addMember = mem => setMembers(prev => [...prev, mem]);
    const deleteMember = mem => setMembers(prev => prev.filter(m => m !== mem));

    const addComment = text => setComments(prev => [...prev, { text, id: Date.now() }]);
    const deleteComment = commentId => setComments(prev => prev.filter(item => item.id !== commentId));

    const createCard = () => {

        if(!title) return;
        submit(
            { title,
              description,
              dueDate,
              members: JSON.stringify(members),
              subtasks: JSON.stringify(subtasks),
              comments: JSON.stringify(comments)
            },
            { method: 'post', action: '/board/' + params.boardId + '/column/' + columnId + action }
        );
        handleClose();
    }
    
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth='md'>
        <DialogTitle>
            <Stack direction='row' justifyContent='space-between' sx={{borderBottom: '1px solid grey'}}>
                <Typography variant='h5'>Card Detail</Typography>
                <IconButton onClick={handleClose}><CloseIcon /></IconButton>
            </Stack>
        </DialogTitle>

        <DialogContent>
            <Stack gap={1}>
                <TextField 
                autoFocus
                margin="dense"
                fullWidth
                variant='standard'
                placeholder='Add Title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                InputProps={{ 
                    disableUnderline: true,
                    style: { fontSize: '1.5rem'}
                    }}
                />
                
                <TextField
                margin="dense"
                fullWidth
                placeholder='Add Description'
                variant='standard'
                value={description}
                onChange={e => setDescription(e.target.value)}
                InputProps={{ 
                    disableUnderline: true
                    }}
                />
                
                <ListInput label='Add Members' addItem={addMember} />

                <Stack direction="row" spacing={1} mb={2} flexWrap='wrap' rowGap={1}>
                    { members.map(mem => <Chip key={mem} label={mem} onDelete={() => deleteMember(mem)} variant="outlined" />)}
                </Stack>

                <DatePicker
                label='Due Date'
                slotProps={{
                    textField: {
                      helperText: 'Enter due date in MM/DD/YYYY format. Default date is Today',
                    },
                  }}
                value={dueDate}
                onChange={(newValue) => setDueDate(newValue)}
                />

                <ListInput label='Add Subtasks' addItem={addSubtask} />

                <Stack>
                    {subtasks.map(task => 
                        <Paper key={task.id} sx={{ my: .5}}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' mx={1}>
                                <FormControlLabel
                                label={<Typography variant='body2'>{ task.text }</Typography>}
                                control={<Checkbox size='small' checked={task.completed} onChange={() => toggleTask(task.id)}/>}
                                />
                                <IconButton size='small' onClick={() => deleteSubtask(task.id)} ><DeleteIcon fontSize='small'/></IconButton>
                            </Stack>
                        </Paper>
                    )}
                </Stack>

                <ListInput label='Add Comments' addItem={addComment} />

                <Stack>
                    {comments.map(comment =>
                        <Paper key={comment.id} sx={{ my: .5}}>
                            <Stack direction='row' justifyContent='space-between' alignItems='center' mx={1}>
                                <Typography variant='body2'>{ comment.text }</Typography>
                                <IconButton size='small' onClick={() => deleteComment(comment.id)} ><DeleteIcon fontSize='small'/></IconButton>
                            </Stack>
                        </Paper>
                    )}
                </Stack>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button type='button' onClick={handleClose}>Cancel</Button>
            <Button type='submit' onClick={createCard}>{data.title ? 'Save Changes' : 'Create'}</Button>
        </DialogActions>
</Dialog>
  )
}

export default CardForm;

function ListInput({ label, addItem }){
    const [text, setText] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if(!text.trim()) return;
        addItem(text)
        setText("");
    }
    
    return(
        <form onSubmit={submit}>
            <TextField
            variant='standard'
            margin="dense"
            placeholder={label}
            fullWidth
            value={text}
            onChange={(event) => setText(event.target.value)}
            InputProps={{ 
                disableUnderline: true
             }}
            />
        </form>
    )
}