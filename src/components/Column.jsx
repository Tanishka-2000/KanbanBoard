import { useState } from 'react';
import { Paper, Typography, Button, Stack, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useParams, useSubmit } from 'react-router-dom';

import ItemCard from './ItemCard';
import ColumnForm from './ColumnForm';
import CardForm from './CardForm';

function Column({ column, color }) {
  const [open, setOpen] = useState(false);
  const [cardData, setCardData] = useState({});
  const [cardAction, setCardAction] = useState('/card');
  const [openEdit, setOpenEdit] = useState(false);

  const submit = useSubmit();
  const params = useParams();

  const deleteCard = (cardId) => {
    submit({}, { method: 'delete', action: '/board/' + params.boardId + '/column/' + column._id + '/card/' + cardId + '/delete'})
  }

  const deleteColumn = () => {
    submit({}, { method: 'delete', action: '/board/' + params.boardId + '/column/' + column._id + '/delete'})
  }

  const handleClose = () => {
    setOpen(false)
    setCardData({});
    setCardAction("/card");
  }

  const allowDrop = e => e.preventDefault();

  function dragStart(e, cardId){
    e.dataTransfer.setData('cardId', cardId);
    e.dataTransfer.setData('currentColumnId', column._id);
  }

  const drop = e => {
    let currentColumnId = e.dataTransfer.getData('currentColumnId');
    let cardId = e.dataTransfer.getData('cardId');
    let newColumnId = column._id;

    if(!currentColumnId || !cardId || !newColumnId) return;
    submit({ currentColumnId, cardId, newColumnId},
      {method: 'post', action: '/board/' + params.boardId + '/changeColumn'});
  }

  return (
    <Paper sx={{ flexBasis: '400px' }} elevation={5} >
        <div onDragOver={allowDrop} onDrop={drop} style={{ height: '100%'}}>

          <Stack direction ='row' alignItems='center' justifyContent='space-between' sx={{backgroundColor: column.color, color: 'white'}} py={1} px={2}>
            <Typography variant='h6'>{column.name}</Typography>
            <Stack direction='row'>
              <Typography variant='subtitle1' sx={{display: 'flex', alignItems:'center'}}>{column.cards.length} / {column.limit}</Typography>
              <IconButton color='inherit' onClick={() => setOpenEdit(true)}><EditIcon /></IconButton>
              <IconButton color='inherit' onClick={deleteColumn}><DeleteIcon /></IconButton>
            </Stack>
          </Stack>

          { column.cards.map( (card, i) => 
            <ItemCard
              key={i}
              card={card}
              color={column.color}
              setOpen={setOpen}
              setCardData={setCardData}
              setCardAction={setCardAction}
              deleteCard={deleteCard}
              dragStart={dragStart} />
            )}

        <Button sx={{ color: column.color, width: '100%', textAlign: 'center'}} onClick={() => setOpen(true)}>+ add new card</Button>

        { open && <CardForm open={open} handleClose={handleClose} columnId={column._id} action={cardAction} data={cardData} />}
        
        {
          openEdit &&
          <ColumnForm
            open={openEdit}
            handleClose={() => setOpenEdit(false)}
            data={{ name: column.name, limit: column.limit, color: column.color}}
            action={'column/' + column._id + '/edit'}
          />
        }
      </div>
    </Paper>
  )
}

export default Column;  