import { Card,Typography, Divider, CardContent, Stack, IconButton, Chip} from '@mui/material'
import SubTask from '@mui/icons-material/TaskAlt';
import Comment from '@mui/icons-material/MessageOutlined';
import Edit from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/DeleteOutline';

export default function ItemCard ({ card, color, dragStart, setOpen, setCardData, setCardAction, deleteCard }){

    const editCard = () => {
        setCardData(card);
        setCardAction('/card/' + card._id + '/edit')
        setOpen(true);
    }
    const completedSubtask = card.subtasks.reduce((acc, task) => task.completed ? acc + 1 : acc, 0)
    
    return(
    <div draggable onDragStart={(e) => dragStart(e, card._id)}>
        <Card sx={{ backgroundColor: color + '50', margin: '20px 10px'}}>
            <CardContent sx={{ '&:last-child': { paddingBottom: '0px'}}}>
            <Typography variant='subtitle1' sx={{ fontWeight: 500}}>{ card.title}</Typography>
            {
                card.description
                &&
                <Typography variant='body2' color='text.secondary' sx={{ my: 1}}>{ card.description }</Typography>
            }
            {
                card.members?.length > 0
                && 
                <Stack direction='row' gap={1} alignItems='center'>
                    <Typography variant='subtitle2' sx={{ my: 1}}>Members</Typography>
                    <Stack direction='row' gap={1}>
                    {card.members.map(member => <Chip key={member} label={member} variant='outlined'/>)}
                    </Stack>
                </Stack>
            }

            {
                card.dueDate
                &&
                <Typography variant='caption' sx={{ display: 'inline-block', width: '100%', textAlign: 'end'}}>
                    { new Date(card.dueDate).toDateString() }
                </Typography>
            }
            
            <Divider sx={{ my:1}}/>
            <Stack direction='row' alignItems='center' color='text.secondary'>
                <SubTask sx={{mr: .5}}/> {completedSubtask}/{card.subtasks.length}
                <Comment sx={{ml: 2, mr: .5}} /> {card.comments.length}
                <IconButton onClick={editCard} sx={{ marginLeft: 'auto'}}><Edit /></IconButton>
                <IconButton onClick={() => deleteCard(card._id)}><Delete /></IconButton>
            </Stack>

            </CardContent>
        </Card>
    </div>
    )
}